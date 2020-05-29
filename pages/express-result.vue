<template>
  <div class="jury">
    <section class="section section-first">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <ProjectList :status="'Экспресс каталог'" :page="'express-result'" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProjectList from '~/components/ProjectList'

export default {
  layout: 'onlyMenu',
  components: {
    ProjectList
  },
  async fetch ({ store }) {
    await store.dispatch('user/makeMenu')
  },
  data () {
    return {
      title: 'Победители'
    }
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
</style>
