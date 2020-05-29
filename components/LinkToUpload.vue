<template>
  <div class="link">
    <nuxt-link to="/upload-add" class="img">
      <img
        src="@/assets/img/thumb.jpg"
        alt="заглушка"
        class="masonry-image"
      >
    </nuxt-link>
    <nuxt-link to="/upload-add" class="btn-block">
      <button class="btn">
        Отправить работу
      </button>
    </nuxt-link>
  </div>
</template>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.link
  position: relative
  z-index: 9
  margin-top: 26.36px
  text-align: center

.btn-block
  position: relative
  height: 41px
  z-index: 0
  margin-bottom: 20px

img
  margin-top: 26.36px auto 20px
  &::after
    content: 'Нажми сюда, чтобы загрузить свою работу'
    position: absolute
    top: 45%
    left: 50%
    transform: translate(-50%, -50%)
    font-size: 26px
    text-align: center
    width: 180px
    height: auto
    color: $color-placeholder

.btn
  position: relative
  text-align: center
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  margin: 8px 0
  border: none
  border-radius: 0
  padding: 4px 10px
  font-weight: 600
  font-size: 20px
  background-color: $color-accent
  color: $btn-upload-text
  z-index: 0
</style>
