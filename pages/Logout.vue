<template>
  <div class="out">
    <div class="Logout">
      Выход
    </div>
  </div>
</template>

<script>
export default {
  async fetch ({ store }) {
    await store.dispatch('user/logout')
    await store.dispatch('user/makeMenu')
  },
  data () {
    return {
      title: 'Выход'
    }
  },
  created () {
    this.$router.push('/')
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
  margin-top: 14px

.out
  position: relative
  height: 50vh

.Logout
   position: absolute
   top: 50%
   left: 50%
   transform: translate(-50%, -50%)
   color: $color-accent
   font-size: 50px
</style>
