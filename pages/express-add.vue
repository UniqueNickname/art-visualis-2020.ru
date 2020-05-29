<template>
  <div class="jury">
    <section class="section section-first">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <InputImage :limit="1000" :status="'Экспресс каталог'" />
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-12">
            <ProjectList :status="'Экспресс каталог'" :page="'past-add'" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProjectList from '~/components/ProjectList'
import InputImage from '~/components/InputImage'

export default {
  layout: 'onlyMenu',
  components: {
    ProjectList,
    InputImage
  },
  async fetch ({ store }) {
    await store.dispatch('user/makeMenu')
  },
  data () {
    return {
      title: 'Экспресс каталог'
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
