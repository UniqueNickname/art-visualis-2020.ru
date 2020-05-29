<template>
  <div class="onlyMenu">
    <header>
      <TopLine />
      <Menu />
    </header>
    <nuxt />
  </div>
</template>

<script>
import TopLine from '~/components/TopLine'
import Menu from '~/components/Menu'

export default {
  components: {
    TopLine,
    Menu
  }
}
</script>

<style lang="sass">
.onlyMenu
  margin-top: 140px
</style>
