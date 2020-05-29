<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
// import TopLine from '~/components/TopLine'
// import Menu from '~/components/Menu'

export default {
  // components: {
  //   TopLine,
  //   Menu
  // }
}
</script>

// <style lang="sass" scoped>
// .all
//   margin-top: 140px
// </style>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap')
@import url('https://fonts.googleapis.com/css?family=Russo+One&display=swap')
@import url('https://fonts.googleapis.com/css?family=Pangolin&display=swap')

@import '~/assets/sass/vars.sass'

%small-z
  z-index: 9990 !important

.picture-preview
  @extend %small-z
.picture-inner
  @extend %small-z
.picture-inner-text
  @extend %small-z

::placeholder
  color: $color-placeholder
  font-size: 12px

::selection
  background-color: $color-selection-fill
  color: $color-selection-text

input, textarea
  outline: none
  &:focus:required:invalid
    border-color: red
  &:required:valid
    border-color: green

body
  margin: 0 auto
  font-size: 16px
  min-width: 320px
  max-width: 1920px
  position: relative
  line-height: 1.65
  letter-spacing: 0.5px
  overflow-x: hidden
  color: $color-text
  font-family: $font-for-body

.container-fluid
  padding: 0 !important
  width: 100vw !important

.container
  padding: 0 !important

a
  color: $color-link
  text-decoration: underline
  &:hover, &:focus
    color: $color-link

ol, ul
  li
    list-style: none
    margin: 0

.row
  width: 100%
  margin: 0 !important
  div
    padding: 0

.section
  // margin-top: 140px
  &-header
    width: 100vw
    text-align: center
    font-size: $font-size-for-seaction-header
    font-weight: $font-width-for-seaction-header
    font-family: $font-for-seaction-header
  .image
    height: 100%
    width: 100%
    background-position: center
    background-size: cover
    ol, ul
      margin-bottom: 0
      li
        list-style: none
        margin-bottom: 20px
        &:last-child
          margin-bottom: 0
</style>
