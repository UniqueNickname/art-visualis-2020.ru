<template>
  <div class="resultd">
    <section class="section section-first">
      <!-- <h1 class="section-header mb-3 mt-3">
        {{ title }}
      </h1> -->
      <div class="container">
        <div class="justify-content-center">
          <UserList :mode="'all'" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import UserList from '~/components/UserList'

export default {
  layout: 'workFilter',
  components: {
    UserList
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
.section
  margin-top: 193px
</style>
