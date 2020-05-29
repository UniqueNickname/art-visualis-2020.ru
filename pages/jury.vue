<template>
  <div class="jury">
    <section class="section section-first">
      <div class="container">
        <div class="row justify-content-center">
          <div class="text-center col-lg-4 col-md-6 col-12">
            <div class="card" style="width: 18rem;">
              <div
                id="face1"
                :style="{ backgroundImage: 'url(' + require('@/assets/img/face1.jpg') + ')' }"
                class="face"
              />
              <div class="card-body">
                <div class="card-text">
                  <h3>Миронов Борис Константинович</h3>
                  <p>Заслуженный деятель искусств</p>
                  <p>Профессор</p>
                  <p>Заведующий отделением дизайна ФГАОУ ВО Балтийского Федерального университета им. И. Канта, г. Калининград</p>
                  <p>Член ВТОО «Союз художников России»</p>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center col-lg-4 col-md-6 col-12">
            <div class="card" style="width: 18rem;">
              <div
                id="face2"
                :style="{ backgroundImage: 'url(' + require('@/assets/img/face2.jpg') + ')' }"
                class="face"
              />
              <div class="card-body">
                <div class="card-text">
                  <h3>Махова Татьяна Олеговна</h3>
                  <p>Кандидат педагогических наук</p>
                  <p>Доцент кафедры архитектуры, дизайна и экологии Сочинского государственного университета, г. Сочи</p>
                  <p>Член Союза дизайнеров России</p>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center col-lg-4 col-md-6 col-12">
            <div class="card" style="width: 18rem;">
              <div
                id="face3"
                :style="{ backgroundImage: 'url(' + require('@/assets/img/face3.jpg') + ')' }"
                class="face"
              />
              <div class="card-body">
                <div class="card-text">
                  <h3>Машанов Андрей Николаевич</h3>
                  <p>Заслуженный художник России</p>
                  <p>Профессор кафедры дизайна ФГБОУ ВО ОмГТУ, г. Омск</p>
                  <p>Председатель Омского отделения ВТОО «Союз художников России»</p>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center col-lg-4 col-md-6 col-12">
            <div class="card" style="width: 18rem;">
              <div
                id="face4"
                :style="{ backgroundImage: 'url(' + require('@/assets/img/face4.jpg') + ')' }"
                class="face"
              />
              <div class="card-body">
                <div class="card-text">
                  <h3>Медер Эдуард Альбертович</h3>
                  <p>Профессор кафедры дизайна, рисунка и живописи ЧОУ ВО Международного института дизайна и сервиса, г. Челябинск</p>
                  <p>Председатель Магнитогорского отделения ВТОО «Союз художников России»</p>
                  <p>Член Союза дизайнеров России</p>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center col-lg-4 col-md-6 col-12">
            <div class="card" style="width: 18rem;">
              <div
                id="face5"
                :style="{ backgroundImage: 'url(' + require('@/assets/img/face6.jpg') + ')' }"
                class="face"
              />
              <div class="card-body">
                <div class="card-text">
                  <h3>Типикин Владимир Владимирович</h3>
                  <p>Профессор</p>
                  <p>Зав. кафедрой графического дизайна ФГБОУ ВО Уральского государственного архитектурно-художественного университета, г. Екатеринбург</p>
                  <P>Член Союза дизайнеров России</P>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'onlyMenu',
  async fetch ({ store }) {
    await store.dispatch('user/makeMenu')
  },
  data () {
    return {
      title: 'Члены жюри'
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

.card
  margin: 0 auto 30px
  border: none
  &-text
    text-align: left
    color: $jury-text
    h3
      margin-top: 10px
      padding-left: 10px
      font-size: 16px
      font-weight: 700
    p
      font-size: 16px
      margin: 4px 0 0 0
      padding: 0 0 4px 10px
      // border-bottom: 1px solid $jury-text-underline
  .face
    width: 286px
    height: 300px
    background-repeat: no-repeat
    background-size: 100%
  #face1
    background-size: 126%
    background-position: 50% 50%
  #face2
    background-position: 50% 20%
  #face3
    background-position: 50% 25%
  #face4
    background-position: 50% 20%
  #face5
    background-position: 60% 20%
    background-size: 200%
</style>
