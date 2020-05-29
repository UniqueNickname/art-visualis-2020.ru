const { Router } = require('express')
const consola = require('consola')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../schemes/User')
const router = Router()
require('dotenv').config()

router.post('/register',
  [
    check('email', 'Некоректный email').normalizeEmail().isEmail(),
    check('phone', 'Некоректный номер телефона').isMobilePhone()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        consola.error({ message: `Server error: Некоректные данные при регистрации ${errors.array()}`, badge: true })
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при регистрации'
        })
      }

      const { firstname, surname, patronymic, city, university, teacher, email, phone, role } = req.body

      let patronymicNew = patronymic
      if (!patronymicNew) { patronymicNew = ' ' }

      const user = await User.findOne({ firstname, surname, patronymic: patronymicNew, city, university, teacher, email, phone, role })
      if (!user) {
        // consola.error({ message: 'Такой пользователь не обнаружен', badge: true })

        const userNew = new User({ firstname, surname, patronymic: patronymicNew, city, university, teacher, email, phone, role, projectsCounter: 0 })
        await userNew.save()

        const userData = userNew._id

        const token = jwt.sign(
          { userData },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '24h' }
        )
        consola.ready({ message: 'Вы успешно зарегистрированы', badge: true })
        return res.status(201).json({ token, message: 'Вы успешно зарегистрированы' })
      } else {
        // consola.info({ message: 'Пользователь обнаружен', badge: true })

        const userData = user._id

        const token = jwt.sign(
          { userData },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '24h' }
        )

        consola.ready({ message: 'Вы успешно авторизированы', badge: true })
        return res.status(201).json({ token, message: 'Вы успешно авторизированы' })
      }
    } catch (e) {
      consola.error({ message: `Server error: ${e.message}`, badge: true })
      return res.status(500).json({ message: 'Сервер упал при регистрации' })
    }
  })

router.post('/register-admin',
  async (req, res) => {
    try {
      const { firstname, surname, patronymic, login, password, role } = req.body
      let juryNumber = 0
      if (role === 'Jury') {
        const Jury = await User.find({ role: 'Jury' })
        juryNumber = Jury.length + 1
      }

      const hashedPass = await bcrypt.hash(password, 12)
      const user = new User({ firstname, surname, patronymic, phone: login, password: hashedPass, role, juryNumber })
      await user.save()

      return res.status(201).json({ message: 'Вы успешно зарегистрированы' })
    } catch (e) {
      consola.error({ message: `Server error: ${e.message}`, badge: true })
      return res.status(500).json({ message: 'Сервер упал при регистрации' })
    }
  })

router.post('/login',
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        consola.error({ message: 'Некоректные данные при входе', badge: true })
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при входе'
        })
      }
      const { login, password } = req.body

      const users = await User.find({ phone: login })

      if (!users) {
        consola.error({ message: 'Неверный номер телефона', badge: true })
        return res.status(400).json({ message: 'Неверный номер телефона' })
      }

      let allRight = false
      let userNumber = ''
      let isMatch = ''
      for (let i = 0; i < users.length; i++) {
        isMatch = await bcrypt.compare(password, users[i].password)
        if (isMatch) {
          allRight = true
          userNumber = i
        }
      }

      if (!allRight) {
        consola.error({ message: 'Неверный пароль', badge: true })
        return res.status(400).json({ message: 'Неверный пароль' })
      }
      const userData = users[userNumber]._id

      const token = jwt.sign(
        { userData },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
      )
      res.status(200).json({ token, message: 'Login success' })
    } catch (e) {
      consola.error({ message: `Server error: ${e.message}`, badge: true })
      return res.status(500).json({ message: 'Сервер упал при аутентификации' })
    }
  }
)

module.exports = router
