<template>
  <div v-if="showWork" class="project-list-item" :class="`item-${work._id}`">
    <div v-if="page === 'upload'" class="work-info work-status">
      {{ work.status }}
    </div>
    <img
      v-if="work.status !== 'Отклонена'"
      :src="`./${path}`"
      :alt="work.name"
      class="masonry-image"
      @click="galleryToggle"
    >
    <img v-else src="@/assets/img/deleted.jpg" :alt="work.name" class="masonry-image">
    <EditWorkRating v-if="page === 'rating'" :work="work" />
    <div v-if="page === 'published'" class="work-info estimation-all" @click="toggleEstamation">
      Оценка: {{ estimationAll }}
    </div>
    <WorkAllRating v-if="swicherEstimation" :work="work" />
    <div v-if="!editName" class="work-info work-name" @click="editNameToggle">
      {{ work.name }}
    </div>
    <EditWorkName v-if="editName" :work="work" />
    <div v-if="work.status !== 'Победитель' && work.status !== 'Старое' && page != 'express-result' && !editAuthor" class="work-info work-author" @click="editAuthorToggle">
      {{ work.authorName }}
    </div>
    <EditWorkAuthor v-if="editAuthor" :work="work" />
    <div v-if="nomination === 'Все' && work.status !== 'Победитель' && work.status !== 'Старое' && page != 'express-result' && !editNomination" class="work-info work-nomination" @click="editNominationToggle">
      {{ work.nomination }}
    </div>
    <EditWorkNomination v-if="editNomination" :work="work" />
    <div v-if="page === 'unpublished' || page === 'published'" class="work-info work-more-info light" @click="moreInfoToggle">
      {{ moreInfoBtnText }}
    </div>
    <WorkMoreInfo v-if="showMoreInfo" :work="work" class="work-info" />
    <EditWorkStatus v-if="page === 'unpublished'" :work="work" />
    <div v-if="showGallery && work.type === 'Image'">
      <font-awesome-icon :icon="'window-close'" class="hide-btn" @click="galleryHide()" />
      <ImageGallery :work="work" />
    </div>
    <div v-if="showGallery && work.type === 'Video'">
      <font-awesome-icon :icon="'window-close'" class="hide-btn" @click="galleryHide()" />
      <VideoPlayer :work="work" />
    </div>
  </div>
</template>

<script>
import ImageGallery from '~/components/ImageGallery'
import VideoPlayer from '~/components/VideoPlayer'
import EditWorkName from '~/components/EditWorkName'
import EditWorkAuthor from '~/components/EditWorkAuthor'
import EditWorkNomination from '~/components/EditWorkNomination'
import EditWorkStatus from '~/components/EditWorkStatus'
import WorkMoreInfo from '~/components/WorkMoreInfo'
import EditWorkRating from '~/components/EditWorkRating'
import WorkAllRating from '~/components/WorkAllRating'
import eventEmitter from '~/middleware/eventEmitter'

export default {
  components: {
    EditWorkAuthor,
    EditWorkName,
    EditWorkStatus,
    EditWorkRating,
    WorkMoreInfo,
    WorkAllRating,
    EditWorkNomination,
    ImageGallery,
    VideoPlayer
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['work', 'page', 'nomination'],
  data () {
    return {
      showWork: true,
      path: `${this.work.path[0]}`,
      showGallery: false,
      editNomination: false,
      editAuthor: false,
      editName: false,
      showMoreInfo: false,
      moreInfoBtnText: 'Подробнее...',
      swicherEstimation: false,
      dataEstimation: [],
      haveNewData: false
    }
  },
  computed: {
    estimationAll () {
      let res = 0
      if (!this.haveNewData) {
        for (let i = 0; i < this.work.estimation.length; i++) {
          res += +this.work.estimation[i]
        }
      } else {
        for (let i = 0; i < this.dataEstimation.length; i++) {
          res += +this.dataEstimation[i].estamation
        }
      }
      return res
    }
  },
  created () {
    eventEmitter.$on('hideWorkEmit', (id) => {
      if (id === this.work._id) {
        this.hideMenu()
      }
    })
    eventEmitter.$on('editName', (newName) => {
      this.work.name = newName
    })
    eventEmitter.$on('editAuthor', (newAuthor) => {
      this.work.authorName = newAuthor
    })
    eventEmitter.$on('editNomination', (newNomination) => {
      this.work.nomination = newNomination
    })
    eventEmitter.$on('hideWorkEdits', () => {
      this.hideAllEdits()
    })
    eventEmitter.$on('haveNewData', (dataEstimation) => {
      this.haveNewData = true
      this.dataEstimation = dataEstimation
    })
  },
  mounted () {
    if ((this.page === 'upload' || this.page === 'unpublished' || this.page === 'published' || this.page === 'winners-add' || this.page === 'past-add') && this.work.status !== 'Отклонена') {
      const moreInfo = document.querySelectorAll(`.item-${this.work._id} .work-info`)
      for (let i = 0; i < moreInfo.length; i++) {
        moreInfo[i].classList.add('light')
      }
    }
  },
  methods: {
    moreInfoToggle () {
      this.hideAllEdits()
      this.swicherEstimation = false
      this.showMoreInfo = !this.showMoreInfo
      if (this.showMoreInfo) { this.moreInfoBtnText = 'Скрыть' } else { this.moreInfoBtnText = 'Подробнее...' }
    },
    hideMenu () {
      this.showWork = false
    },
    galleryToggle () {
      this.showGallery = !this.showGallery
    },
    galleryHide () {
      this.showGallery = false
    },
    editNominationToggle () {
      if ((this.page === 'upload' || this.page === 'unpublished' || this.page === 'published') && this.work.status !== 'Отклонена') {
        this.editNomination = !this.editNomination
        this.editAuthor = false
        this.editName = false
        this.swicherEstimation = false
        this.showMoreInfo = false
      }
    },
    editAuthorToggle () {
      if ((this.page === 'upload' || this.page === 'unpublished' || this.page === 'published') && this.work.status !== 'Отклонена') {
        this.editNomination = false
        this.editAuthor = !this.editAuthor
        this.editName = false
        this.swicherEstimation = false
        this.showMoreInfo = false
      }
    },
    editNameToggle () {
      if ((this.page === 'upload' || this.page === 'unpublished' || this.page === 'published' || this.page === 'winners-add' || this.page === 'past-add') && this.work.status !== 'Отклонена') {
        this.editNomination = false
        this.editAuthor = false
        this.editName = !this.editName
        this.swicherEstimation = false
        this.showMoreInfo = false
      }
    },
    hideAllEdits () {
      this.editNomination = false
      this.editAuthor = false
      this.editName = false
      // this.swicherEstimation = false
      // this.showMoreInfo = false
    },
    toggleEstamation () {
      this.hideAllEdits()
      this.swicherEstimation = !this.swicherEstimation
      this.showMoreInfo = false
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.project-list-item
  width: 320px
  height: auto
  margin: 0 auto 30px
  padding: 0 10px
  font-family: $font-for-painting
  .masonry-image
    cursor: pointer
    width: 300px
    height: auto

.work-info
  text-align: center
  font-weight: 600

.light
  cursor: pointer
  &:hover
    color: $color-accent

.work-name
  font-size: 18px

.work-author
  font-size: 14px

.work-nomination
  font-size: 14px

.work-more-info
  font-size: 14px

.hide-btn
  position: fixed
  top: 30px
  right: 30px
  z-index: 9999999999999
  color: red
  width: 30px
  height: auto
  cursor: pointer
  &:hover
    color: green
</style>
