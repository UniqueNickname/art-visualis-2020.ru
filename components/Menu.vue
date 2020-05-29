<template>
  <div class="container-fluid">
    <nav class="first-line add-line ">
      <font-awesome-icon :icon="'bars'" class="d-block d-xl-none bars" @click="mobileMenuToggle()" />
      <ul :class="{'d-none' : showMobileMenu == false}" class="d-xl-flex">
        <li v-for="(link, index) in links" :key="index" @click="mobileMenuHide()">
          <nuxt-link :to="link.path" exact no-prefetch active-class="active">
            {{ link.name }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import eventEmitter from '~/middleware/eventEmitter'

export default {
  name: 'Menu',
  data () {
    return {
      showMobileMenu: false
    }
  },
  computed: {
    links () {
      return this.$store.getters['user/hasMenu']
    }
  },
  created () {
    eventEmitter.$on('hideMenu', () => {
      this.mobileMenuHide()
    })
    eventEmitter.$on('menuVisibleUpdated', () => {
      this.mobileMenuHide()
    })
  },
  methods: {
    mobileMenuToggle () {
      this.showMobileMenu = !this.showMobileMenu
      this.hideFilter()
    },
    mobileMenuHide () {
      this.showMobileMenu = false
      this.hideFilter()
    },
    hideFilter () {
      eventEmitter.$emit('hideFilter')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

a
  cursor: pointer

.add-line
  min-height: 51px
  width: 100vw
  border:
    top: none
    right: none
    left: none
    bottom: 2px solid $color-contrast
  font-family: $font-for-menu
  position: relative
  text-align: center
  font-size: 14px
  background-color: $second-line-bcg
  font-weight: 400
  svg
    height: 40px
  .bars
    margin: 3.5px auto
    font-size: 20px
    color: $second-line-text
  ul
    display: flex
    justify-content: center
    padding: 0
    margin: 0
    li
      margin: 4px 0
      a
        color: $second-line-text
        text-decoration: none
        padding: 10px
        &:hover
          background-color: $second-line-bcg_focus

.first-line
  position: fixed
  z-index: 9999
  top: 70px
  li
    padding: 10px 10px 10px
  .active
    border-top: 4px solid $second-line-bcg
    border-bottom: 2px solid $second-line-bcg_active
    &:hover
      border-top: 4px solid $second-line-bcg_focus

@media screen and (max-width: 1199px)
  ul
    flex-flow: column wrap
    li
      margin: 0 auto !important
      max-width: 200px
      &:last-child
        margin: 0 auto 4px !important

</style>
