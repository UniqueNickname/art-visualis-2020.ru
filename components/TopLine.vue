<template>
  <div class="container-fluid">
    <div class="top-line">
      <div>
        <nuxt-link exact no-prefetch active-class="active" to="/" class="logo router-link">
          <img
            class="logo-image"
            src="@/assets/img/logo.svg"
            @click="menuUpdated()"
          >
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import eventEmitter from '~/middleware/eventEmitter'

export default {
  name: 'TopLine',
  methods: {
    menuUpdated () {
      eventEmitter.$emit('menuVisibleUpdated')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.container-fluid
.top-line
  background-color: $color-contrast
  z-index: 9999
  position: fixed
  top: 0
  width: 100vw
  text-align: center
  .logo-image
    width: 172px
    margin: 0 auto
    margin: 10px 0
    height: 50px
    width: auto
    &:hover
      transform: scale(1.1)

@media screen and (max-width: 990px)
  .logo-image
    &:hover
      transform: scale(1) !important
</style>
