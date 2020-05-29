<template>
  <div class="container-fluid">
    <nav class="add-line second-line">
      <font-awesome-icon :icon="'filter'" class="d-block d-xl-none bars" @click="mobileFilterToggle()" />
      <ul :class="{'d-none' : showMobileFilter == false}" class="d-xl-flex">
        <li v-for="(filter, index) in filters" :key="index" @click="mobileFilterHide()">
          <a
            :class="{ 'active' : curentFilter === filter }"
            @click.prevent="$store.dispatch('user/filter', filter)"
          >
            {{ filter }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import eventEmitter from '~/middleware/eventEmitter'

export default {
  name: 'NominationFilter',
  data () {
    return {
      showMobileFilter: false
    }
  },
  computed: {
    curentFilter () {
      return this.$store.getters['user/hasFilter']
    },
    filters () {
      return this.$store.getters['user/hasFilters']
    }
  },
  created () {
    eventEmitter.$on('hideFilter', () => {
      this.mobileFilterHide()
    })
    eventEmitter.$on('menuVisibleUpdated', () => {
      this.mobileFilterHide()
    })
  },
  methods: {
    mobileFilterToggle () {
      this.showMobileFilter = !this.showMobileFilter
    },
    mobileFilterHide () {
      this.showMobileFilter = false
    },
    hideMenu () {
      eventEmitter.$emit('hideMenu')
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

.second-line
  position: fixed
  z-index: 9998
  top: 120px
  li
    padding: 10px 4px 4px
  .active
    border: 1px solid $second-line-bcg_active

@media screen and (max-width: 1199px)
  ul
    flex-flow: column wrap
    li
      margin: 0 auto !important
      max-width: 200px
      &:last-child
        margin: 0 auto 4px !important
  .second-line
    .active
      border: none
      border-bottom: 2px solid $second-line-bcg_active

</style>
