<template>
  <div class="registration">
    <section class="section section-first">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="wrapper">
              <LogIn />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LogIn from '~/components/LogIn'
export default {
  layout: 'onlyMenu',
  components: {
    LogIn
  },
  data () {
    return {
      title: 'Админ'
    }
  },
  head () {
    return {
      title: this.title + ' | Art Visualis'
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
