const { Router } = require('express')
const consola = require('consola')
const jwt = require('jsonwebtoken')
const User = require('../schemes/User')
const router = Router()
require('dotenv').config()

router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body
    // consola.info({ message: `token: ${token}`, badge: true })

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const userId = decoded.userData

    const user = await User.findOne({ _id: userId })
    if (!user) {
      // consola.error({ message: 'Пользователь не найден', badge: true })
      return res.status(200).json({ message: 'Пользователь не найден' })
    }

    const userFirstname = user.firstname
    const userSurname = user.surname
    const userPatronymic = user.patronymic
    const userCity = user.city
    const userUniversity = user.university
    const userTeacher = user.teacher
    const userEmail = user.email
    const userPhone = user.phone
    const userRole = user.role
    const juryNumber = user.juryNumber

    // consola.info({ message: `userFirstname: ${userFirstname}`, badge: true })

    return res.status(201).json({
      userId,
      userFirstname,
      userSurname,
      userPatronymic,
      userCity,
      userUniversity,
      userTeacher,
      userEmail,
      userPhone,
      userRole,
      juryNumber
    })
  } catch (e) {
    // consola.info({ message: e.message, badge: true })
    return res.status(200).json({ message: 'Неверный токен' })
  }
})

router.post('/allUsers', async (req, res) => {
  try {
    const users = await User.find({ role: 'User' })

    return res.status(201).json({ users })
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({ message: 'Сервер упал при попытке запросить контент' })
  }
})

router.post('/moreInfo', async (req, res) => {
  try {
    const { _id } = req.body
    const user = await User.findOne({ _id })

    return res.status(201).json({ city: user.city, university: user.university, teacher: user.teacher })
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({ message: 'Сервер упал при попытке запросить контент' })
  }
})

module.exports = router
