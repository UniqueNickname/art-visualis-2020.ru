<template>
  <div class="image-gallery">
    <client-only>
      <agile
        :speed="speed"
      >
        <div v-for="(path, index) in work.path" :key="index" class="slide">
          <img :src="`./${path}`" :alt="work.name">
        </div>
        <template slot="prevButton">
          <svg x="0px" y="0px" viewBox="0 0 24 24"><path style="fill: #ffffff" d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z" /></svg>
        </template>
        <template slot="nextButton">
          <svg x="0px" y="0px" viewBox="0 0 24 24"><path style="fill: #ffffff" d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z" /></svg>
        </template>
      </agile>
    </client-only>
    <!-- <Slider /> -->
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['work'],
  computed: {
    speed () {
      if (this.work.path.length === 1) {
        return 0
      } else {
        return 500
      }
    }
  }
}
</script>

<style lang="sass">
.image-gallery
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 100vw
  z-index: 999999999
  .agile
    &__nav-button
      background: transparent
      border: none
      color: #fff
      cursor: pointer
      // font-size: 24px
      height: 100%
      position: absolute
      top: 0
      transition-duration: .3s
      width: 80px
      opacity: .2
      &:hover
        opacity: 1
      &--prev
        left: 0
      &--next
        right: 0
    &__dots
      bottom: 10px
      left: 50%
      position: absolute
      transform: translateX(-50%)
    &__dot
      margin: 0 10px
      button
        background-color: transparent
        border: 1px solid #fff
        border-radius: 50%
        cursor: pointer
        display: block
        height: 10px
        line-height: 0
        margin: 0
        padding: 0
        transition-duration: .3s
        width: 10px
      &--current,
      &:hover
        button
          background-color: #fff
  .slide
    position: relative
    display: block
    height: 100vh
    object-fit: cover
    width: 100vh
    text-align: center
    background: black
    img
      max-width: 100vw
      max-height: 100vh
      height: auto
      width: auto
</style>
