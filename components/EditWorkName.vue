<template>
  <div class="edit-work-name">
    <label for="name">
      <input id="name" v-model="curent" type="text" name="name">
    </label>
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
      curent: this.work.name,
      old: this.work.name
    }
  },
  methods: {
    cancelEdit () {
      eventEmitter.$emit('hideWorkEdits')
      eventEmitter.$emit('editName', this.curent)
    },
    sendData () {
      if (this.curent !== this.old) {
        const data = {
          workID: this.work._id,
          newData: this.curent
        }
        this.$axios.$post(
          `http://${process.env.HOST}:${process.env.PORT}/api/projects/edit-name`,
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

.edit-work-name
  text-align: center
  font-weight: 600
  font-size: 18px

input
  width: 300px
  text-align-last: center
  outline: none
  border:
    top: none
    left: none
    right: none
    bottom: 1px dashed $form-border-color

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
