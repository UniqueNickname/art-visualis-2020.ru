<template>
  <div class="edit-work-status">
    <fieldset class="rating">
      <legend class="rating-caption">
        Оценка {{ rating }}
      </legend>
      <div class="rating-grop">
        <input
          :id="`mark${work._id}-1`"
          v-model="rating"
          class="rating-star"
          type="radio"
          name="mark"
          value="1"
          aria-label="Ужасно"
        >
        <input
          :id="`mark${work._id}-2`"
          v-model="rating"
          class="rating-star"
          type="radio"
          name="mark"
          value="2"
          aria-label="Сносно"
        >
        <input
          :id="`mark${work._id}-3`"
          v-model="rating"
          class="rating-star"
          type="radio"
          name="mark"
          value="3"
          aria-label="Нормально"
        >
        <input
          :id="`mark${work._id}-4`"
          v-model="rating"
          class="rating-star"
          type="radio"
          name="mark"
          value="4"
          aria-label="Хорошо"
        >
        <input
          :id="`mark${work._id}-5`"
          v-model="rating"
          class="rating-star"
          type="radio"
          name="mark"
          value="5"
          aria-label="Отлично"
        >
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['work'],
  data () {
    return {
      rating: 0
    }
  },
  computed: {
    userId () {
      return this.$store.getters['user/hasId']
    },
    juryNumber () {
      return this.$store.getters['user/hasJuryNumber']
    }
  },
  watch: {
    rating () {
      this.setRating()
      for (let i = 1; i <= 5; i++) {
        document.getElementById(`mark${this.work._id}-${i}`).classList.remove('rating-star-checked')
      }
      if (this.rating > 0) {
        document.getElementById(`mark${this.work._id}-${this.rating}`) //  .classList.add('rating-star-checked')
      }
    }
  },
  created () {
    this.rating = this.work.estimation[this.juryNumber - 1]
  },
  methods: {
    setRating () {
      const rating = {
        _id: this.work._id,
        jury: this.userId,
        rating: this.rating
      }
      this.$axios.$post(
        `http://${process.env.HOST}:${process.env.PORT}/api/projects/rating`,
        rating)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'
@import 'vue-loading-overlay/dist/vue-loading.css'

.edit-work-status
  text-align: center
  font-weight: 600
  font-size: 18px
.rating
  padding: 0
  margin: 0
  border: none
  text-align: center
  font-family: $font-for-painting
  width: 300px
  &-caption
    font-size: 20px
    padding: 0
    margin-bottom: -2px
    font-weight: 600
  &-grop
    position: relative
    width: $star-size*5
    height: $star-size
    background-image: url('~assets/img/star-off.svg')
    background-size: $star-size auto
    background-repeat: repeat-x
    margin: 0 auto
  &-star
    position: absolute
    width: $star-size
    height: $star-size
    top: 0
    left: 0
    background-size: $star-size auto
    background-repeat: repeat-x
    appearance: none
    &:nth-of-type(1)
      width: $star-size
      z-index: 5
    &:nth-of-type(2)
      width: $star-size*2
      z-index: 4
    &:nth-of-type(3)
      width: $star-size*3
      z-index: 3
    &:nth-of-type(4)
      width: $star-size*4
      z-index: 2
    &:nth-of-type(5)
      width: $star-size*5
      z-index: 1
    &-checked
      background-image: url('~assets/img/star-on.svg')
    &:checked
      background-image: url('~assets/img/star-on.svg')
    &:hover
      background-image: url('~assets/img/star-on.svg')
      &~.rating-star
        background-image: url('~assets/img/star-off.svg')
</style>
