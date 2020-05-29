<template>
  <div class="project">
    <div class="loading mb-3 mt-3">
      <div v-if="showProjectListItem" class="project-list">
        <masonry :cols="masonry_cols" :gutter="30">
          <div
            v-if="page === 'upload'"
          >
            <LinkToUpload />
          </div>
          <ProjectListItem
            v-for="(work, index) in curentWorks"
            :key="index"
            :work="work"
            :page="page"
            :nomination="filterName"
          />
        </masonry>
        <!-- <p>
          curentPage: {{ curentPage }} | foundStart: {{ foundStart }} | foundEnd: {{ foundEnd }} | works: {{ works.length }}
        </p> -->
        <div v-if="works.length > foundStep" class="paginator">
          <button v-if="curentPage < 2" class="disable">
            Предыдущая
          </button>
          <button v-if="curentPage >= 2" class="prev" @click="prevPage">
            Предыдущая
          </button>
          <div class="counter">
            {{ curentPage }}
          </div>
          <button v-if="foundEnd <= works.length - 1" class="next" @click="nextPage">
            Следующая
          </button>
          <button v-if="foundEnd > works.length - 1" class="disable">
            Следующая
          </button>
        </div>
      </div>
      <loading
        :active.sync="isLoading"
        :is-full-page="false"
        :color="'#993365'"
        :height="100"
        :width="100"
        :loader="'bars'"
      />
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import LinkToUpload from '~/components/LinkToUpload.vue'
import ProjectListItem from '~/components/ProjectListItem.vue'

export default {
  components: {
    Loading,
    ProjectListItem,
    LinkToUpload
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['status', 'page'],
  data () {
    return {
      isLoading: true,
      works: {},
      curentWorks: {},
      showProjectListItem: true,
      curentPage: 1,
      foundStep: 18,
      foundStart: 0,
      foundEnd: 0
    }
  },
  computed: {
    filterName () {
      return this.$store.getters['user/hasFilter']
    },
    userId () {
      return this.$store.getters['user/hasId']
    },
    masonry_cols () {
      if (this.works.length > 1) {
        return { default: 3, 1000: 2, 768: 1 }
      } else {
        return { default: 1 }
      }
    }
  },
  watch: {
    async filterName () {
      await this.reset()
    }
  },
  async created () {
    await this.reset()
  },
  methods: {
    async reset () {
      this.curentPage = 1
      this.foundStart = 0
      this.foundEnd = this.foundStep
      await this.downloadWorks()
      await this.setCurentWorks()
    },
    setCurentWorks () {
      this.curentWorks = this.works.slice(this.foundStart, this.foundEnd)
    },
    prevPage () {
      this.showProjectListItem = false
      this.isLoading = true
      this.curentPage--
      this.foundStart -= this.foundStep
      this.foundEnd -= this.foundStep
      this.setCurentWorks()
      setTimeout(() => {
        this.isLoading = false
        this.showProjectListItem = true
      }, 200)
    },
    nextPage () {
      this.showProjectListItem = false
      this.isLoading = true
      const newStartPoint = this.foundStart + this.foundStep
      const newEndPoint = this.foundEnd + this.foundStep
      this.curentPage++
      this.foundStart = newStartPoint
      this.foundEnd = newEndPoint
      this.setCurentWorks()
      setTimeout(() => {
        this.isLoading = false
        this.showProjectListItem = true
      }, 200)
    },
    setColumn () {
      this.windowWidth = document.documentElement.clientWidth
    },
    async downloadWorks () {
      this.isLoading = true
      this.showProjectListItem = false

      if (this.page !== 'upload') {
        const request = {
          status: this.status,
          nomination: this.filterName,
          start: 0,
          end: 9999
        }
        await this.$axios.$post(
          `http://${process.env.HOST}:${process.env.PORT}/api/projects/find`,
          request).then(
          (res) => {
            this.works = res.works
            this.showProjectListItem = true
            this.isLoading = false
          }
        )
      } else {
        const request = {
          author: this.userId
        }
        await this.$axios.$post(
          `http://${process.env.HOST}:${process.env.PORT}/api/projects/findForOneUser`,
          request).then(
          (res) => {
            this.works = res.findWorks
            this.showProjectListItem = true
            this.isLoading = false
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'
@import 'vue-loading-overlay/dist/vue-loading.css'

.loading
  position: absolute
  width: 100%
  min-height: 200px
  .vld-overlay
    outline: none

.project
  position: relative
  &-list
    &-header
      text-align: center
      font-size: 24px
      font-family: $font-for-painting-category
      font-weight: 800
  .paginator
    text-align: center
    position: absolute
    left: 50%
    transform: translateX(-50%)
    display: flex
    width: 300px
    height: 37px
    .counter
      // position: absolute
      // left: 50%
      // transform: translateX(-50%)
      margin: 0 5px
      width: 30px
      background-color: $form-btn-fill
      color: $form-btn-color
      padding: 4px 10px
      font-size: 18px
    button
      // position: absolute
      display: block
      margin: 0 auto
      border: none
      background-color: $form-btn-fill
      color: $form-btn-color
      padding: 4px 10px
      width: 130px
      font-weight: 600
      font-size: 18px
    .disable
      background-color: $form-btn-fill-disable
    .prev
      // left: 0
    .next
      // right: 0
</style>
