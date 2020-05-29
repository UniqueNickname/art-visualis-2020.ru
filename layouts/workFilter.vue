<template>
  <div class="workFilter">
    <header>
      <TopLine />
      <Menu />
      <NominationFilter />
    </header>
    <nuxt />
  </div>
</template>

<script>
import TopLine from '~/components/TopLine'
import NominationFilter from '~/components/NominationFilter'
import Menu from '~/components/Menu'

export default {
  components: {
    TopLine,
    NominationFilter,
    Menu
  }
}
</script>

<style lang="sass" scoped>
.workFilter
  margin-top: 193px
</style>
