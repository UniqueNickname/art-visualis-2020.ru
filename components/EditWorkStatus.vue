<template>
  <div class="edit-work-status">
    <loading
      :active.sync="isLoading"
      :is-full-page="false"
      :color="'#993365'"
      :height="100"
      :width="100"
      :loader="'bars'"
    />
    <button
      v-if="!isLoading"
      class="isPublic add"
      @click="publish"
    >
      Опубликовать
    </button>
    <button
      v-if="!isLoading"
      class="isPublic remove"
      @click="reject"
    >
      Отклонить
    </button>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import eventEmitter from '~/middleware/eventEmitter'

export default {
  components: {
    Loading
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['work'],
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    hideWork () {
      eventEmitter.$emit('hideWorkEmit', this.work._id)
    },
    publish () {
      this.isLoading = true
      const newStatus = {
        _id: this.work._id,
        newStatus: 'Принято'
      }
      this.$axios.$post(
        `http://${process.env.HOST}:${process.env.PORT}/api/projects/publish`,
        newStatus).then(
        this.isLoading = false,
        this.hideWork()
      )
    },
    reject () {
      this.isLoading = true
      const id = {
        _id: this.work._id
      }
      this.$axios.$post(
        `http://${process.env.HOST}:${process.env.PORT}/api/projects/reject`,
        id).then(
        this.isLoading = false,
        this.hideWork()
      )
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.loading
  position: absolute
  width: 100%
  min-height: 200px
  .vld-overlay
    outline: none

.edit-work-status
  text-align: center
  font-weight: 800
  font-size: 20px
  width: 300px
  height: 92px
  button
    position: relative
    width: 300px
    height: 41px
  .isPublic
    display: block
    margin: 10px auto
    color: $color-contrast
  .remove
    background-color: $color-text
  .add
    background-color: $color-accent
</style>
