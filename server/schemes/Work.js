const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workSchema = new Schema({
  author: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  authorName: {
    require: true,
    type: String
  },
  name: {
    require: true,
    type: String
  },
  nomination: {
    require: true,
    type: String
  },
  path: {
    require: true,
    type: Array
  },
  content: {
    // require: true,
    type: Array
  },
  length: {
    require: true,
    type: String
  },
  type: {
    require: true,
    type: String
  },
  status: {
    require: true,
    type: String
  },
  number: {
    require: true,
    type: String
  },
  estimation: {
    type: Array
  }
})

const WorkModel = mongoose.model('Work', workSchema)
module.exports = WorkModel
