<template>
  <div
    :class="{ 'd-none' : !works.length }"
    class="user col-12 col-md-6 col-xl-4"
  >
    <div class="text name">
      {{ userName }}
    </div>
    <div class="text city">
      Город: {{ user.city }}
    </div>
    <div class="text university">
      Университет: {{ user.university }}
    </div>
    <div class="text teacher">
      Руководитель: {{ user.teacher }}
    </div>
    <div v-if="mode === 'all'" class="text email">
      Email: {{ user.email }}
    </div>
    <div v-if="mode === 'all'" class="text phone">
      Номер телефона: {{ user.phone }}
    </div>
    <div class="text works">
      Работы участника:
      <ul>
        <li v-for="(work, index) in works" :key="index">
          - {{ work.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['user', 'f', 'mode'],
  data () {
    return {
      works: []
    }
  },
  computed: {
    worksCounter () {
      return this.user.projectsCounter
    },
    userName () {
      return `${this.user.surname} ${this.user.firstname} ${this.user.patronymic}`
    },
    filterName () {
      return this.$store.getters['user/hasFilter']
    }
  },
  watch: {
    filterName () {
      this.findWorks()
    }
  },
  created () {
    this.findWorks()
  },
  methods: {
    findWorks () {
      this.works = []
      for (let i = 0; i < this.worksCounter; i++) {
        if (this.user.works[i].nomination === this.f && this.user.works[i].status === 'Принято') {
          this.works.push(this.user.works[i])
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.text
  font-family: $font-for-painting
  padding-left: 20px
.works
  margin-bottom: 40px
  ul
    padding:
      left: 10px
.name
  font-size: 20px
  font-weight: 600
</style>
