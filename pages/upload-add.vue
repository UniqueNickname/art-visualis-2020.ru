<template>
  <div class="upload">
    <!-- еуче -->
    <section class="section section-first">
      <div class="switcher">
        <h3 class="mb-3 mt-3">
          Что вы хотите отправить
        </h3>
        <div class="button-block">
          <button :class="{'active' : switcher}" @click="showImage">
            Изображения
          </button>
          <button :class="{'active' : !switcher}" @click="showVideo">
            Видео
          </button>
        </div>
      </div>
      <InputImage v-if="switcher" :limit="6" :status="'Непроверено'" />
      <InputVideo v-else />
    </section>
  </div>
</template>

<script>
import InputImage from '~/components/InputImage.vue'
import InputVideo from '~/components/InputVideo.vue'

export default {
  layout: 'onlyMenu',
  components: {
    InputVideo,
    InputImage
  },
  async fetch ({ store }) {
    await store.dispatch('user/makeMenu')
  },
  data () {
    return {
      title: 'Отправить работы',
      switcher: true
    }
  },
  methods: {
    showVideo () { this.switcher = false },
    showImage () { this.switcher = true }
  },
  head () {
    return {
      title: this.title + ' | Art Visualis'
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.section
  margin-top: 140px

h3
  margin: 0 auto
  max-width: 900px
  font-size: 16px
  font-weight: 400
  text-align: center

.switcher
  border: 1px solid $UW_switcher-border
  color: $UW_switcher-text
  width: 300px
  margin: 0 auto 20px
  .button-block
    text-align: center
    button
      outline-color: darken($color-accent, 20%)
      margin: 0 10px 10px
      padding: 6px
      border: none
      background-color: transparent
    .active
      background-color: $UW_switcher-input-fill
      color: $UW_switcher-input-text
</style>
