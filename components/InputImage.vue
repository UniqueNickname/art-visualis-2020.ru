<template>
  <div class="container">
    <div class="row">
      <div class="name-input col-12">
        <label for="Name">
          Название проекта
          <input
            id="Name"
            v-model="name"
            type="text"
            name="Name"
          >
        </label>
      </div>
      <div v-if="status != 'Победитель' && status != 'Старое' && status != 'Экспресс каталог'" class="name-input col-12">
        <label for="nomination">
          Номинации
          <select id="nomination" v-model="nomination" name="nomination">
            <option v-for="(n, index) in filters" :key="index">
              {{ n }}
            </option>
          </select>
        </label>
      </div>
      <div
        v-for="(user, index) in num"
        :key="index"
        class="col-12 col-md-6 col-xl-4 picture-input-container"
      >
        <picture-input
          ref="pictureInput"
          :custom-strings="{
            drag: 'Перетащи сюда JPG до 1Мб',
            tap: 'Нажми сюда, чтобы выбрать фото из галереи'
          }"
          :removable="true"
          accept="image/jpeg, image/jpg"
          remove-button-class="remove-photo"
          height="300"
          size="2"
          button-class="change-photo"
          width="300"
          @change="onChange"
        />
      </div>

      <div class="col-12">
        <div v-if="content[0]" class="button button-reset">
          <button
            title="Удалит все изображения, чтобы вы заного могли выбрать нужные"
            @click="reset"
          >
            <font-awesome-icon icon="undo" />Сброс
          </button>
        </div>
      </div>
      <div class="col-12">
        <div class="error">
          {{ error }}
        </div>
      </div>
      <div class="col-12">
        <div
          v-if="content[0]"
          class="button button-upload"
          title="Отправит работу, убедитесь, что правильно выбрали изображения"
        >
          <button @click="upload">
            Отправить работу на конкурс
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['limit', 'status'],
  data () {
    return {
      num: 1,
      name: '',
      nomination: 'Живопись',
      content: [],
      error: ''
    }
  },
  computed: {
    filters () {
      const allFilters = this.$store.getters['user/hasFilters']
      const filters = allFilters.slice(1, -1)
      return filters
    }
  },
  methods: {
    reset () {
      this.num = 1
      this.content = []
      document.querySelector('.remove-photo').click()
    },
    onChange (image) {
      if (image) {
        this.content[this.num - 1] = image
        this.num++
        if (this.num > this.limit) { this.num = this.limit }
      }
    },
    async upload () {
      if (this.name) {
        const project = {
          author: this.$store.getters['user/hasId'],
          name: this.name,
          nomination: this.nomination,
          content: this.content,
          length: this.content.length,
          type: 'Image',
          status: this.status
        }
        await this.$axios.$post(
          `http://${process.env.HOST}:${process.env.PORT}/api/projects/upload`,
          project).then(
          this.name = '',
          this.error = '',
          this.reset()
        )
        if (this.status !== 'Победитель') {
          this.$router.push('/upload-list')
        }
      } else {
        this.error = 'Введите имя'
      }
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/vars.sass'

.picture-input
  button
    margin: 16px 0
    font-weight: 400
    font-size: 16px
    border-radius: 6px
    padding: 2px 6px
  .change-photo
    border: 1px solid $form-btn-fill
    background-color: transparent
    color: $form-btn-fill
  .remove-photo
    background-color: transparent
    border: none
    height: 0
    width: 0
    overflow: hidden

</style>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.name-input
  text-align: center
  margin: 10px 0
  label
    input
      width: 260px
      border:
        top: none
        left: none
        right: none
        bottom: 1px dashed $form-border-color
    select
      outline: none
      border:
        top: none
        left: none
        right: none
        bottom: 1px dashed $form-border-color

.picture-input
  color: $color-placeholder
  font-size: 26px
  &-container
    margin: 0 auto

.picture-inner
  border: none !important

.button
  text-align: center
  button
    margin: 8px 0
    border: none
    padding: 4px 10px
    font-weight: 600
    font-size: 20px
  &-upload
    button
      background-color: $btn-upload-fill
      color: $btn-upload-text
  &-reset
    button
      background-color: $btn-reset-fill
      color: $btn-reset-text
      border-radius: 6px

.error
  margin: 20px auto
  text-align: center
  color: $form-btn-color-error
  width: 300px
  background-color: $form-btn-fill-error
  border-radius: 4px
</style>
