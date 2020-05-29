// const consola = require('consola')

export const state = () => ({
  id: null,
  firstname: null,
  surname: null,
  patronymic: null,
  city: null,
  university: null,
  teacher: null,
  email: null,
  phone: null,
  role: 'User',
  juryNumber: null,
  token: null,
  menu: [],
  filter: 'Все',
  filters: [
    'Все',
    'Живопись',
    'Графика',
    'Композиция',
    'Скульптура',
    'ДПИ',
    'Графический дизайн',
    'Промышленный дизайн',
    'Дизайн среды',
    'Проектная графика',
    'Фотография',
    'Моушн-дизайн'
  ]
})

export const mutations = {
  setId (state, id) {
    state.id = id
  },
  setFirstname (state, firstname) {
    state.firstname = firstname
  },
  setSurname (state, surname) {
    state.surname = surname
  },
  setPatronymic (state, patronymic) {
    state.patronymic = patronymic
  },
  setCity (state, city) {
    state.city = city
  },
  setUniversity (state, university) {
    state.university = university
  },
  setTeacher (state, teacher) {
    state.teacher = teacher
  },
  setEmail (state, email) {
    state.email = email
  },
  setPhone (state, phone) {
    state.phone = phone
  },
  setRole (state, role) {
    state.role = role
  },
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
    state.role = null
    state.id = null
  },
  updateMenu (state, links) {
    state.menu = links
  },
  setFilter (state, filter) {
    state.filter = filter
  },
  setJuryNumber (state, num) {
    state.juryNumber = num
  }
}

export const actions = {
  nuxtServerInit ({ dispatch }) {
  },
  login ({ commit }, token) {
    commit('setToken', token)
  },
  logout ({ commit }) {
    this.$cookies.removeAll()
    commit('clearToken')
  },
  filter ({ commit }, filter) {
    commit('setFilter', filter)
  },
  async makeMenu ({ commit, state }) {
    // consola.info({ message: 'START: makeMenu()', badge: true })
    const cookieToken = this.$cookies.get('t')
    commit('setToken', cookieToken)
    const tokenForServer = { token: state.token }

    // consola.info({ message: 'START: $axios', badge: true })
    await this.$axios.post(`http://${process.env.HOST}:${process.env.PORT}/api/users/verify`, tokenForServer).then(
      (res) => {
        commit('setId', res.data.userId)
        commit('setFirstname', res.data.userFirstname)
        commit('setSurname', res.data.userSurname)
        commit('setPatronymic', res.data.userPatronymic)
        commit('setCity', res.data.userCity)
        commit('setUniversity', res.data.userUniversity)
        commit('setTeacher', res.data.userTeacher)
        commit('setEmail', res.data.userEmail)
        commit('setPhone', res.data.userPhone)
        commit('setRole', res.data.userRole)
        commit('setJuryNumber', res.data.juryNumber)
      }
      // consola.info({ message: `Имя: ${state.firstname}`, badge: true })
    )
    let newMenu = []
    if (state.role === 'User') {
      newMenu = [
        {
          path: '/jury',
          name: 'Члены жюри'
        },
        {
          path: '/results',
          name: 'Итоги I тура'
        },
        {
          path: '/winners',
          name: 'Каталог победителей'
        },
        {
          path: '/past',
          name: 'Каталог прошлых лет'
        },
        {
          path: '/express-result',
          name: 'Экспресс каталог'
        },
        // {
        //   path: '/registration',
        //   name: 'Отправить работы'
        // },
        {
          path: '/authorization',
          name: 'Админ'
        }
      ]
    } else if (state.role === 'Jury') {
      newMenu = [
        {
          path: '/jury',
          name: 'Члены жюри'
        },
        {
          path: '/rating',
          name: 'Работы участников'
        },
        {
          path: '/winners',
          name: 'Каталог победителей'
        },
        {
          path: '/past',
          name: 'Каталог прошлых лет'
        },
        {
          path: '/express-result',
          name: 'Экспресс каталог'
        },
        {
          path: '/logout',
          name: 'Выйти'
        }
      ]
    } else if (state.role === 'Moderator') {
      newMenu = [
        {
          path: '/jury',
          name: 'Члены жюри'
        },
        {
          path: '/unpublished',
          name: 'Неопубликованные'
        },
        {
          path: '/published',
          name: 'Опубликованные'
        },
        {
          path: '/winners-add',
          name: 'Каталог победителей'
        },
        {
          path: '/past-add',
          name: 'Каталог прошлых лет'
        },
        {
          path: '/express-all',
          name: 'Экспресс каталог'
        },
        {
          path: '/logout',
          name: 'Выйти'
        }
      ]
    } else {
      newMenu = [
        {
          path: '/jury',
          name: 'Члены жюри'
        },
        {
          path: '/results',
          name: 'Итоги I тура'
        },
        {
          path: '/winners',
          name: 'Каталог победителей'
        },
        {
          path: '/past',
          name: 'Каталог прошлых лет'
        },
        {
          path: '/express-result',
          name: 'Экспресс каталог'
        },
        // {
        //   path: '/registration',
        //   name: 'Отправить работы'
        // },
        {
          path: '/authorization',
          name: 'Админ'
        }
      ]
      this.$cookies.removeAll()
      commit('clearToken')
    }
    commit('updateMenu', newMenu)
  }
}

export const getters = {
  hasId: state => state.id,
  hasFirstname: state => state.firstname,
  hasSurname: state => state.surname,
  hasPatronymic: state => state.patronymic,
  hasCity: state => state.city,
  hasUniversity: state => state.university,
  hasTeacher: state => state.teacher,
  hasEmail: state => state.email,
  hasPhone: state => state.phone,
  hasRole: state => state.role,
  hasToken: state => state.token,
  hasMenu: state => state.menu,
  hasFilter: state => state.filter,
  hasFilters: state => state.filters,
  hasJuryNumber: state => state.juryNumber
}
