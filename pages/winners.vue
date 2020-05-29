<template>
  <div class="jury">
    <section class="section section-first">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <a href="/каталог победителей_АВ_2020.pdf">
              <div class="image" :style="{ backgroundImage: 'url(' + require('@/assets/img/' + img) + ')' }" />
              <div class="title">Каталог победителей</div>
            </a>
            <!-- <ProjectList :status="'Победитель'" :page="'winners'" /> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import ProjectList from '~/components/ProjectList'

export default {
  layout: 'onlyMenu',
  components: {
    // ProjectList
  },
  async fetch ({ store }) {
    await store.dispatch('user/makeMenu')
  },
  data () {
    return {
      title: 'Победители',
      img: 'Screenshot_2.png'
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
div
  text-align: center
a
  text-decoration: none
.title
  font-size: 20px
  color: black
  font-weight: 700
  margin-top: -30px
.image
  width: 300px
  height: 300px
  margin: auto
  background-size: contain
  background-repeat: no-repeat
</style>
