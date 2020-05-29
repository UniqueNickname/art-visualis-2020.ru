/* eslint-disable */
<template>
  <div class="container mb-3 main-slider">
    <client-only>
      <agile
        :autoplay="true"
        :speed="500"
      >
        <div v-for="(slide, index) in slides" :key="index" class="slide">
          <div :style="{ backgroundImage: 'url(' + require('@/assets/img/' + slide.img) + ')' }">
            <p class="text">
              {{ slide.text }}
              <span>{{ slide.accentText }}</span>
            </p>
          </div>
        </div>
        <template slot="prevButton">
          <svg x="0px" y="0px" viewBox="0 0 24 24"><path style="fill: #ffffff" d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z" /></svg>
        </template>
        <template slot="nextButton">
          <svg x="0px" y="0px" viewBox="0 0 24 24"><path style="fill: #ffffff" d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z" /></svg>
        </template>
      </agile>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data () {
    return {
      slides: [
        // {
        //   img: '2.jpg',
        //   text: 'VI всероссийская студенческая выставка-конкурс',
        //   accentText: 'Art-visualis'
        // },
        // {
        //   img: '9.jpg',
        //   text: 'Мы ждём ваши работы на',
        //   accentText: 'Art-visualis'
        // },
        // {
        //   img: '1.jpg',
        //   text: 'VI всероссийская студенческая выставка-конкурс',
        //   accentText: 'Art-visualis'
        // },
        // {
        //   img: '8.jpg',
        //   text: 'Мы ждём ваши работы на',
        //   accentText: 'Art-visualis'
        // }
        {
          img: '2.jpg',
          text: 'Приём работ участников',
          accentText: 'завершён'
        },
        {
          img: '9.jpg',
          text: 'Каталог победителей будет выставлен',
          accentText: 'после 14 апреля'
        },
        {
          img: '1.jpg',
          text: 'Приём работ участников',
          accentText: 'завершён'
        },
        {
          img: '8.jpg',
          text: 'Каталог победителей будет выставлен',
          accentText: 'после 14 апреля'
        }
      ]
    }
  }
}
</script>

<style lang="sass" >
@import '~/assets/sass/vars.sass'
.main-slider
  margin-top: 123px
  .agile
    &__nav-button
      background: transparent
      border: none
      color: #fff
      cursor: pointer
      // font-size: 24px
      height: 100%
      position: absolute
      top: 0
      transition-duration: .3s
      width: 80px
      opacity: .2
      &:hover
        opacity: 1
      &--prev
        left: 0
      &--next
        right: 0
    &__dots
      bottom: 10px
      left: 50%
      position: absolute
      transform: translateX(-50%)
    &__dot
      margin: 0 10px
      button
        background-color: transparent
        border: 1px solid #fff
        border-radius: 50%
        cursor: pointer
        display: block
        height: 10px
        line-height: 0
        margin: 0
        padding: 0
        transition-duration: .3s
        width: 10px
      &--current,
      &:hover
        button
          background-color: #fff

  .slide
    position: relative
    display: block
    height: $slider-height
    object-fit: cover
    width: 100%
    div
      width: 100%
      height: 100%
      background-position: center
      background-size: cover
    .text
      position: relative
      font-family: $font-for-slider
      font-weight: $font-weight-for-slider
      color: white
      height: auto
      background-color: $slider-text-fill
      span
        display: block
        color: orange

  @media screen and (max-height: 570px)
    .slide
      height: $slider-height-for-mobile

  @media screen and (min-width: 991px)
    .slide
      .text
        top: 40px
        left: 150px
        transform: translate(0, 0)
        font-size: $font-size-for-slider
        text-align: left
        max-width: 350px

  @media screen and (max-width: 990px)
    .slide
      .text
        top: 40px
        left: 70px
        transform: translate(0, 0)
        font-size: $font-size-for-slider - $font-size-for-slider/3
        text-align: left
        max-width: 330px

  @media screen and (max-width: 400px)
    .slide
      .text
        left: 30px
        top: 50px
        font-size: $font-size-for-slider/2
        max-width: 340px

  @media screen and (max-height: 510px)
    .slide
      .text
        top: 10px
        left: 120px
        max-width: 360px
</style>
