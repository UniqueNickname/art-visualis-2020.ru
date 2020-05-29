<template>
  <div class="work-all-rating">
    <div v-for="(est, index) in dataEstimation" :key="index" class="est">
      {{ est.name }}   |   {{ est.estamation }}
    </div>
  </div>
</template>

<script>
import eventEmitter from '~/middleware/eventEmitter'

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['work'],
  data () {
    return {
      dataEstimation: {}
    }
  },
  created () {
    this.updateEstimation()
  },
  methods: {
    updateEstimation () {
      const data = {
        _id: this.work._id
      }
      this.$axios.$post(
        `http://${process.env.HOST}:${process.env.PORT}/api/projects/updateEstimation`,
        data).then(
        (res) => {
          this.dataEstimation = res.data
          eventEmitter.$emit('haveNewData', this.dataEstimation)
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.work-all-rating
  text-align: center
  font-size: 14px
  border: dashed 1px $color-placeholder
  padding: 8px
</style>
