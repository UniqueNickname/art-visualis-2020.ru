<template>
  <div class="users">
    <div
      v-if="filterName != 'Все'"
    >
      <h1 class="users-list-header mb-3 mt-3">
        {{ filterName }}
      </h1>
      <div class="row loading-no-all loading">
        <UserListItem
          v-for="(user, index) in users"
          :key="index"
          :user="user"
          :f="filterName"
        />
        <loading
          :active.sync="isLoading"
          :is-full-page="false"
          :color="'#993365'"
          :height="100"
          :width="100"
          :loader="'bars'"
        />
      </div>
    </div>
    <div
      v-for="(f, index) in filtersNames"
      v-else
      :key="index"
    >
      <div :class="{ 'd-none' : index === 0 }" class="loading">
        <!-- <div class="loading"> -->
        <h1 class="users-list-header mb-3 mt-3">
          {{ f }}
        </h1>
        <div class="row">
          <UserListItem
            v-for="(user, i) in users"
            :key="i"
            :user="user"
            :f="f"
            :mode="mode"
          />
          <loading
            :active.sync="isLoading"
            :is-full-page="false"
            :color="'#993365'"
            :height="100"
            :width="100"
            :loader="'bars'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import UserListItem from '~/components/UserListItem.vue'

export default {
  components: {
    UserListItem,
    Loading
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['mode'],
  data () {
    return {
      isLoading: true,
      users: []
    }
  },
  computed: {
    filterName () {
      return this.$store.getters['user/hasFilter']
    },
    filtersNames () {
      return this.$store.getters['user/hasFilters']
    }
  },
  watch: {
    filterName () {
      this.downloadUsers()
    }
  },
  created () {
    this.downloadUsers()
  },
  methods: {
    downloadUsers () {
      this.isLoading = true

      this.$axios.$post(
        `http://${process.env.HOST}:${process.env.PORT}/api/users/allUsers`)
        .then(
          (res) => {
            this.users = res.users
            this.isLoading = false
          }
        )
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'
@import 'vue-loading-overlay/dist/vue-loading.css'

.users
  // position: absolute

.loading-no-all
  position: absolute

.loading
  position: relative
  width: 100%
  min-height: 200px

.vld-overlay
  outline: none

.users
  &-list
    &-header
      text-align: center
      font-size: 24px
      font-family: $font-for-painting-category
      font-weight: 800
</style>
