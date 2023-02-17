const { Schema, model } = require('mongoose')

const characterSchema = new Schema({
  name: String,
  occupation: String,
  weapon: String,
  cartoon: Boolean,
})

const Character = model('Character', characterSchema)

module.exports = Character
