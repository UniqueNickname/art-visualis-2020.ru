<template>
  <div class="video-player">
    <div class="video">
      <vue-plyr ref="plyr">
        <video :poster="work.path[0]" :src="work.path[1]">
          <source :src="work.path[1]" type="video/mp4" size="1080">
        </video>
      </vue-plyr>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['work']
}
</script>

<style lang="sass" scoped>
.video-player
  position: fixed
  top: 0
  left: 0
  background: black
  width: 100vw
  height: 100vh
  z-index: 999999999
  .video
    width: 90vw
    max-height: 90vh
    height: auto
    width: auto
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>
