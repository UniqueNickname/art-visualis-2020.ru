<template>
  <div class="resultd">
    <section class="section section-first">
      <div class="container">
        <div class="justify-content-center">
          <UserList :mode="'user'" />
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
