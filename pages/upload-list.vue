<template>
  <div class="jury">
    <section class="section section-first">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <ProjectList :status="'Все'" :page="'upload'" />
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
      title: 'Выгруженные работы'
    }
  },
  head () {
    return {
      title: this.title + ' | Art Visualis'
    }
  }
}
</script>
