<template>
  <div class="jury">
    <section class="section section-first">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <ProjectList :status="'Принято'" :page="'published'" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProjectList from '~/components/ProjectList'

export default {
  layout: 'workFilter',
  components: {
    ProjectList
  },
  async fetch ({ store }) {
    await store.dispatch('user/makeMenu')
  },
  data () {
    return {
      title: 'Опубликованные работы'
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
