<template>
  <div class="signup">
    <div class="form">
      <h2>Введите данные модератора</h2>
      <div class="input-field">
        <input
          id="Surname"
          v-model="surname"
          type="text"
          name="Surname"
        >
        <label for="Surname">
          Фамилия
        </label>
        <span />
      </div>
      <div class="input-field">
        <input
          id="Firstname"
          v-model="firstname"
          type="text"
          name="Firstname"
        >
        <label for="Firstname">
          Имя
        </label>
        <span />
      </div>
      <div class="input-field">
        <input
          id="Patronymic"
          v-model="patronymic"
          type="text"
          name="Patronymic"
        >
        <label for="Patronymic">
          Отчество
        </label>
        <span />
      </div>
      <div class="input-field">
        <input
          id="Phone"
          v-model="login"
          type="tel"
          name="Phone"
        >
        <label for="Phone">
          Телефон
        </label>
        <span />
      </div>
      <div class="input-field">
        <input
          id="Password"
          v-model="password"
          type="password"
          name="Password"
        >
        <label for="Password">
          Пароль
        </label>
        <span />
      </div>
      <label for="role">
        Роль
        <select id="role" v-model="role" name="role">
          <option v-for="(r, index) in roleList" :key="index">
            {{ r }}
          </option>
        </select>
      </label>
      <button
        class="mt-3 signup-btn"
        type="submit"
        @click="signup"
      >
        Зарегистрировать
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstname: null,
      surname: null,
      patronymic: null,
      login: null,
      password: null,
      role: 'Moderator',
      roleList: [
        'Jury',
        'Moderator']
    }
  },
  watch: {
    surname () {
      const input = document.querySelector('#Surname')
      if (this.surname) { input.classList.add('input-not-empty') } else { input.classList.remove('input-not-empty') }
    },
    firstname () {
      const input = document.querySelector('#Firstname')
      if (this.firstname) { input.classList.add('input-not-empty') } else { input.classList.remove('input-not-empty') }
    },
    patronymic () {
      const input = document.querySelector('#Patronymic')
      if (this.patronymic) { input.classList.add('input-not-empty') } else { input.classList.remove('input-not-empty') }
    },
    login () {
      const input = document.querySelector('#Phone')
      if (this.login) { input.classList.add('input-not-empty') } else { input.classList.remove('input-not-empty') }
    },
    password () {
      const input = document.querySelector('#Password')
      if (this.password) { input.classList.add('input-not-empty') } else { input.classList.remove('input-not-empty') }
    }
  },
  mounted () {
    document.querySelector('#Surname').focus()
  },
  methods: {
    signup () {
      const newUser = {
        firstname: this.firstname,
        surname: this.surname,
        patronymic: this.patronymic,
        login: this.login,
        password: this.password,
        role: this.role
      }
      this.$axios.$post(`http://${process.env.HOST}:${process.env.PORT}/api/auth/register-admin`, newUser).then(
        (res) => {
          this.$cookies.set('t', res.token)
          this.$store.dispatch('user/login', res.token)
          this.$store.dispatch('user/makeMenu', res.token)
          this.$router.push('/')
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/vars.sass'

.signup
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
  .form
    margin-top: 20px
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
