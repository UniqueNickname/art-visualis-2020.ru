<template>
  <div class="edit-work-nomination">
    <!-- <label for="nomination">
      <input id="nomination" v-model="curent" type="text" name="nomination">
    </label> -->
    <select id="nomination" v-model="curent" name="nomination">
      <option v-for="(fn, index) in filtersNames" :key="index">
        {{ fn }}
      </option>
    </select>
    <div class="editBtns">
      <div class="editBtn cancel active" @click="cancelEdit">
        <font-awesome-icon :icon="'times'" />
      </div>
      <div :class="{ 'active' : curent != old }" class="editBtn edit" @click="sendData">
        <font-awesome-icon :icon="'edit'" />
      </div>
    </div>
  </div>
</template>

<script>
import eventEmitter from '~/middleware/eventEmitter'

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['work'],
  data () {
    return {
      curent: this.work.nomination,
      old: this.work.nomination
    }
  },
  computed: {
    filtersNames () {
      const value = this.$store.getters['user/hasFilters'].slice(1)
      return value
    }
  },
  methods: {
    cancelEdit () {
      eventEmitter.$emit('hideWorkEdits')
      eventEmitter.$emit('editNomination', this.curent)
    },
    sendData () {
      if (this.curent !== this.old) {
        const data = {
          workID: this.work._id,
          newData: this.curent
        }
        this.$axios.$post(
          `http://${process.env.HOST}:${process.env.PORT}/api/projects/edit-nomination`,
          data).then(
          this.old = this.curent,
          this.cancelEdit()
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.edit-work-nomination
  text-align: center
  font-weight: 600
  font-size: 18px

select
  width: 300px
  text-align-last: center
  outline: none
  border:
    top: none
    left: none
    right: none
    bottom: 1px dashed $form-border-color
  option
    text-align-last: center

.editBtns
  position: relative
  width: 300px
  height: 41px
  .editBtn
    width: 140px
    display: inline-block
    position: absolute
    border: 1px dashed $form-border-color
    color: $form-border-color
  .active
    &:hover
      color: $color-accent
      border: 1px dashed $color-accent
  .cancel
    left: 0
    margin: 0 10px 0 0
  .edit
    right: 0
      margin: 0 0 10px 0
</style>
