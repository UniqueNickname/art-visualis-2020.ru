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
      <div class="col-12">
        <div class="video">
          <video-input
            tipo=" video/mp4"
            duracion="180"
            maxmb="100"
            @info="onInfo"
          />
        </div>
      </div>
      <div class="col-12 preview">
        <div class="preview-header">
          Превью для видео
        </div>
        <picture-input
          ref="pictureInput"
          :custom-strings="{
            drag: 'Перетащи сюда JPG до 1Мб',
            tap: 'Нажми сюда, чтобы выбрать фото из галереи'
          }"
          :removable="true"
          width="300"
          height="300"
          accept="image/jpeg, image/jpg"
          size="1"
          button-class="change-photo"
          remove-button-class="remove-photo"
          @change="onChange"
        />
      </div>
      <div class="col-12">
        <div class="error">
          {{ error }}
        </div>
      </div>
      <div class="col-12">
        <div
          v-if="video"
          class="button button-upload"
        >
          <button
            v-if="preview"
            title="Отправит работу, убедитесь, что правильно выбрали изображения"
            @click="upload"
          >
            Отправить работу на конкурс
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      nomination: 'Моушн-дизайн',
      video: '',
      preview: '',
      error: ''
    }
  },
  methods: {
    onInfo (video) {
      if (video.base64) {
        this.video = video.base64
      }
    },
    onChange (image) {
      if (image) {
        this.preview = image
      }
    },
    async upload () {
      if (this.name) {
        const project = {
          author: this.$store.getters['user/hasId'],
          name: this.name,
          nomination: this.nomination,
          content: [this.preview, this.video],
          length: 2,
          type: 'Video',
          status: 'Непроверено'
        }
        await this.$axios.$post(`http://${process.env.HOST}:${process.env.PORT}/api/projects/upload`, project).then(
          this.name = '',
          this.error = '',
          this.$router.push('/upload-list')
        )
      } else {
        this.error = 'Введите имя'
      }
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/vars.sass'

.video
  max-width: 600px
  margin: 0 auto
  &-input
    position: relative
    &::after
      content: 'Перетащи сюда видео до 100 мб и 3 мин'
      position: absolute
      top: 45%
      left: 50%
      transform: translate(-50%, -50%)
      font-size: 26px
      text-align: center
      width: 180px
      height: auto
      color: $color-placeholder

    .video-inner
      display: none
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

.preview
  text-align: center
  color: $color-placeholder
  &-header
    color: $color-text
    margin: 0 0 20px

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
