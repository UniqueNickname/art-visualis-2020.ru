const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname: {
    require: true,
    type: String
  },
  patronymic: {
    require: true,
    type: String
  },
  surname: {
    require: true,
    type: String
  },
  city: {
    require: true,
    type: String
  },
  university: {
    require: true,
    type: String
  },
  teacher: {
    require: true,
    type: String
  },
  email: {
    // unique: true,
    type: String,
    require: true
  },
  phone: {
    // unique: true,
    require: true,
    type: Number
  },
  password: {
    // unique: true,
    require: true,
    type: String
  },
  role: {
    require: true,
    type: String
  },
  juryNumber: {
    require: true,
    type: Number
  },
  projectsCounter: {
    require: true,
    type: Number
  },
  works: {
    require: true,
    type: Array
  }
})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel
