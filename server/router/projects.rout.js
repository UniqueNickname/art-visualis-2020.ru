const fs = require('fs')
const { Router } = require('express')
const consola = require('consola')
const User = require('../schemes/User')
const Work = require('../schemes/Work')
const router = Router()
require('dotenv').config()

router.post('/upload', async (req, res) => {
  try {
    const { author, name, nomination, content, length, type, status } = req.body
    const findAuthor = await User.findOne({ _id: author })
    if (!findAuthor) {
      consola.error({ message: 'Такой пользователь не существует', badge: true })
      return res.status(400).json({ message: 'Такой пользователь не существует' })
    }
    const authorName = findAuthor.surname + ' ' + findAuthor.firstname + ' ' + findAuthor.patronymic

    let projectsCounter = 0
    if (status !== 'Победитель' && status !== 'Старое') {
      projectsCounter = findAuthor.projectsCounter
    }

    const extension = []
    if (type === 'Image') {
      for (let i = 0; i < length; i++) {
        extension[i] = '.jpg'
      }
    }
    if (type === 'Video') {
      extension[0] = '.jpg'
      extension[1] = '.mp4'
    }

    const work = new Work({ author, authorName, name, nomination, length, type, status, number: projectsCounter + 1, estimation: [0, 0, 0, 0, 0] })
    await work.save()

    const path = `files/${type}/${work.nomination}/${work.name}-${work._id}`
    fs.mkdirSync(`static/${path}`)

    let fullPath = ''
    let base64Image = ''
    const allPaths = []
    for (let i = 0; i < length; i++) {
      fullPath = `${path}/${i}${extension[i]}`
      allPaths[i] = fullPath
      base64Image = content[i].split(';base64,').pop()
      // eslint-disable-next-line handle-callback-err
      fs.writeFile(`static/${fullPath}`, base64Image, { encoding: 'base64' }, (err) => {})
    }

    work.path = allPaths
    await work.save()

    if (status !== 'Победитель' && status !== 'Старое') {
      findAuthor.projectsCounter = findAuthor.projectsCounter + 1
      await findAuthor.save()

      findAuthor.works.push({ name, nomination, status: 'Непроверено' })
      await findAuthor.save()
    }

    consola.ready({ message: `${type} ${name} uploaded successfully`, badge: true })
    return res.status(201).json({ message: 'Работа успешно отправлена' })
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({ message: 'Сервер упал при попытке отправить контент' })
  }
})

router.post('/find', async (req, res) => {
  try {
    const { status, nomination, start, end } = req.body
    let findWorks
    if (nomination === 'Все') {
      findWorks = await Work.find({ status })
    } else {
      findWorks = await Work.find({ status, nomination })
    }
    const works = findWorks.slice(start, end)

    return res.status(201).json({ works })
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({ message: 'Сервер упал при попытке запросить контент' })
  }
})

router.post('/findForOneUser', async (req, res) => {
  try {
    const { author } = req.body
    const findWorks = await Work.find({ author })

    return res.status(201).json({ findWorks })
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({ message: 'Сервер упал при попытке запросить контент' })
  }
})

router.post('/publish', async (req, res) => {
  try {
    const { _id, newStatus } = req.body
    // consola.info({ message: `newStatus -> ${newStatus}` })
    const findWork = await Work.findOne({ _id })
    if (!findWork) {
      consola.error({ message: 'Такой проект не существует', badge: true })
      return res.status(400).json({ message: 'Такой проект не существует' })
    }

    const findUser = await User.findOne({ _id: findWork.author })

    consola.info({ message: `findWork.number - 1 -> ${findWork.number - 1}` })
    findUser.works[findWork.number - 1].status = 'Принято'
    // consola.info({ message: 'У findUser статус обновлён' })

    findWork.status = newStatus
    // consola.info({ message: 'У findWork статус обновлён' })

    findUser.markModified('works')
    await findUser.save()
    await findWork.save()

    consola.ready({ message: 'Работа успешно опубликована', badge: true })
    return res.status(201).json({ message: 'Работа успешно опубликована' })
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({
      message: 'Сервер упал при попытке опубликовать контент'
    })
  }
})

router.post('/reject', async (req, res) => {
  try {
    const { _id } = req.body
    const findWork = await Work.findOne({ _id })
    if (!findWork) {
      consola.error({ message: 'Такой проект не существует', badge: true })
      return res.status(400).json({ message: 'Такой проект не существует' })
    }

    const findUser = await User.findOne({ _id: findWork.author })

    // consola.info({ message: `findWork.number - 1 -> ${findWork.number - 1}` })
    findUser.works[findWork.number - 1].status = 'Отклонена'
    findUser.markModified('works')
    await findUser.save()

    findWork.status = 'Отклонена'
    findWork.save()
    const name = findWork.name
    // findWork.remove()

    for (let i = 0; i < findWork.path.length; i++) {
      fs.unlinkSync(`static/${findWork.path[i]}`)
    }

    const deleteFolderPath = findWork.path[0].slice(0, -6)

    fs.rmdirSync(`static/${deleteFolderPath}`)
    consola.ready({ message: `${name} successfully deleted`, badge: true })
    return res.status(201).json({ message: 'Работа успешно удалена' })
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({
      message: 'Сервер упал при попытке удаления контент'
    })
  }
})

router.post('/rating', async (req, res) => {
  try {
    const { _id, jury, rating } = req.body

    consola.info({ message: `HAVE: : ${_id} - ${jury} - ${rating}`, badge: true })

    const findWork = await Work.findOne({ _id })
    if (!findWork) {
      consola.error({ message: 'Такой проект не существует', badge: true })
      return res.status(400).json({ message: 'Такой проект не существует' })
    }

    const findUser = await User.findOne({ _id: jury })
    if (!findUser) {
      consola.error({ message: 'Такой проект не существует', badge: true })
      return res.status(400).json({ message: 'Такой пользователь не существует' })
    }

    const numJury = findUser.juryNumber

    findWork.estimation[numJury - 1] = rating
    consola.info({ message: `findUser.firstname -> ${findUser.firstname}` })

    findWork.markModified('estimation')
    findWork.save()

    consola.info({ message: `${findWork.name} -> ${findWork.estimation[numJury - 1]}` })
    return res.status(201)
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({ message: 'Сервер упал при попытке изменить рейтинг' })
  }
})

router.post('/edit-name', async (req, res) => {
  try {
    const { workID, newData } = req.body

    const findWork = await Work.findOne({ _id: workID })
    if (!findWork) {
      consola.error({ message: 'Такой проект не существует', badge: true })
      return res.status(400).json({ message: 'Такой проект не существует' })
    }

    const findUser = await User.findOne({ _id: findWork.author })
    if (!findUser) {
      consola.error({ message: 'Такой пользователь не существует', badge: true })
      return res.status(400).json({ message: 'Такой пользователь не существует' })
    }

    findWork.name = newData
    findUser.works[findWork.number - 1].name = newData

    findUser.markModified('works')
    findUser.save()
    findWork.save()

    return res.status(201)
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({ message: 'Сервер упал при попытке изменить name' })
  }
})

router.post('/edit-author', async (req, res) => {
  try {
    const { workID, newData } = req.body

    const findWork = await Work.findOne({ _id: workID })
    if (!findWork) {
      consola.error({ message: 'Такой проект не существует', badge: true })
      return res.status(400).json({ message: 'Такой проект не существует' })
    }

    const findUser = await User.findOne({ _id: findWork.author })
    if (!findUser) {
      consola.error({ message: 'Такой пользователь не существует', badge: true })
      return res.status(400).json({ message: 'Такой пользователь не существует' })
    }

    const nameArr = newData.split(" ")

    findWork.authorName = newData
    findUser.surname = nameArr[0]
    findUser.firstname = nameArr[1]
    findUser.patronymic = nameArr[2]

    findWork.save()
    findUser.save()

    return res.status(201)
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({ message: 'Сервер упал при попытке изменить author' })
  }
})

router.post('/edit-nomination', async (req, res) => {
  try {
    const { workID, newData } = req.body

    const findWork = await Work.findOne({ _id: workID })
    if (!findWork) {
      consola.error({ message: 'Такой проект не существует', badge: true })
      return res.status(400).json({ message: 'Такой проект не существует' })
    }

    const findUser = await User.findOne({ _id: findWork.author })
    if (!findUser) {
      consola.error({ message: 'Такой пользователь не существует', badge: true })
      return res.status(400).json({ message: 'Такой пользователь не существует' })
    }

    findWork.nomination = newData
    findUser.works[findWork.number - 1].nomination = newData

    findUser.markModified('works')
    findUser.save()
    findWork.save()

    return res.status(201)
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({ message: 'Сервер упал при попытке изменить nomination' })
  }
})

router.post('/updateEstimation', async (req, res) => {
  try {
    const { _id } = req.body

    const findWork = await Work.findOne({ _id })
    if (!findWork) {
      consola.error({ message: 'Такой проект не существует', badge: true })
      return res.status(400).json({ message: 'Такой проект не существует' })
    }

    const findUsers = await User.find({ role: 'Jury' })

    const data = []

    for (let i = 0; i < findUsers.length; i++) {
      data.push({
        name: `${findUsers[i].surname} ${findUsers[i].firstname.slice(0, 1)}.${findUsers[i].patronymic.slice(0, 1)}`,
        estamation: findWork.estimation[findUsers[i].juryNumber - 1]
      })
      consola.info({ message: `${findWork.estimation[findUsers[i].juryNumber - 1]}` })
    }
    return res.status(201).json({ data })
  } catch (e) {
    consola.error({ message: `Server error: ${e.message}`, badge: true })
    return res.status(500).json({ message: 'Сервер упал при попытке узнать рейтинг' })
  }
})

module.exports = router
