<template>
  <div class="registration">
    <section class="section section-first">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="wrapper">
              <SignUp />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SignUp from '~/components/SignUp'
export default {
  layout: 'onlyMenu',
  components: {
    SignUp
  },
  async fetch ({ store }) {
    await store.dispatch('user/makeMenu')
  },
  data () {
    return {
      title: 'Вход'
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
.wrapper
  width: 290px
  margin: 0 auto
  font-size: 14px
</style>
