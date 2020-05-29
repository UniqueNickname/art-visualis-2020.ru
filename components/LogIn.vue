<template>
  <div class="login">
    <div class="form">
      <h2>Вход в панель управления</h2>
      <div class="input-field">
        <input
          id="Log"
          v-model="login"
          type="text"
          name="Log"
          autocomplete="username"
        >
        <label for="Log">
          Логин
        </label>
        <span />
      </div>
      <div class="input-field">
        <input
          id="Pass"
          v-model="password"
          type="password"
          name="Pass"
          autocomplete="current-password"
        >
        <label for="Pass">
          Пароль
        </label>
        <span />
      </div>
      <button
        class="mt-3 login-btn"
        type="submit"
        @click="performLogin"
      >
        Войти
      </button>
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: null,
      password: null,
      error: ''
    }
  },
  watch: {
    login () {
      const input = document.querySelector('#Log')
      if (this.login) { input.classList.add('input-not-empty') } else { input.classList.remove('input-not-empty') }
    },
    password () {
      const input = document.querySelector('#Pass')
      if (this.password) { input.classList.add('input-not-empty') } else { input.classList.remove('input-not-empty') }
    }
  },
  mounted () {
    document.querySelector('#Log').focus()
  },
  methods: {
    performLogin () {
      if (this.login && this.password) {
        const user = {
          login: this.login,
          password: this.password
        }
        this.$axios.$post(
          `http://${process.env.HOST}:${process.env.PORT}/api/auth/login`,
          user).then(
          (res) => {
            this.$cookies.set('t', res.token)
            this.$store.dispatch('user/login', res.token)
            this.$store.dispatch('user/makeMenu', res.token)
            this.$router.push('/')
          },
          // eslint-disable-next-line handle-callback-err
          (err) => {
            this.error = 'Нокоректный логин или пароль'
          }
        )
      } else if (this.login) {
        this.error = 'Введите пароль'
      } else if (this.password) {
        this.error = 'Введите логин'
      } else {
        this.error = 'Заполните все поля'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.login
  max-width: 400px
  margin: 0 auto
  display: flex
  justify-content: center
  align-items: center
  button
    display: block
    margin: 0 auto
    border: none
    background-color: $form-btn-fill
    color: $form-btn-color
    padding: 4px 10px
    width: 100%
    font-weight: 600
    font-size: 18px
  .error
    font-size: 14px
    background: red
    color: white
    text-align: center
    margin-top: 10px
    padding: 4px
  .form
    h2
      color: $color-accent
      margin-bottom: 45px
      font-weight: 600
      font-size: 18px
    .input-field
      position: relative
      height: 30px
      width: 100%
      margin-bottom: 26px
      %input-focus
        transform: translateY(-25px)
        font-size: 12px
        background: $color-accent
        color: $color-contrast
        padding: 2px 6px
      %input-focus-span
        transform: scaleX(1)
        transform-origin: left
        transition: transform .5s ease-in-out
      input
        position: absolute
        background: transparent
        border: none
        box-shadow: none
        width: 100%
        &:focus + label
          @extend  %input-focus
        &:focus ~ span::before
          @extend  %input-focus-span
      .input-not-empty + label
        @extend %input-focus
      .input-not-empty ~ span::before
        @extend  %input-focus-span
      label
        position: absolute
        top: 0
        left: 0
        color: $color-text
        padding: 0 6px
        pointer-events: none
        display: block
        transition: .5s
        font-size: 16px
      span
        position: absolute
        bottom: 0
        right: 0
        display: block
        background: $form-border-color
        width: 100%
        height: 2px
        &::before
          content: ''
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          background: $color-accent
          transform: scaleX(0)
          transform-origin: right
          transition: transform .5s ease-in-out
</style>
