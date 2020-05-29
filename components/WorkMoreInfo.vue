<template>
  <div class="more-info">
    <ul>
      <li>Город: {{ city }}</li>
      <li>Университет: {{ university }}</li>
      <li>Руководитель: {{ teacher }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['work'],
  data () {
    return {
      city: '',
      university: '',
      teacher: ''
    }
  },
  created () {
    this.douwloadInfo()
  },
  methods: {
    douwloadInfo () {
      const data = {
        _id: this.work.author
      }
      this.$axios.$post(
        `http://${process.env.HOST}:${process.env.PORT}/api/users/moreInfo`,
        data).then(
        (res) => {
          this.city = res.city
          this.university = res.university
          this.teacher = res.teacher
          // eslint-disable-next-line no-console
          console.log(this.city)
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.more-info
  text-align: center
  font-size: 14px
  border: dashed 1px $color-placeholder
  padding: 8px
  ul
    padding: 0
    margin: 0
</style>
