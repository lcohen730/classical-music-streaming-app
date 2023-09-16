const mongoose = require('mongoose')
const Schema = mongoose.Schema

const composerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  subGenre: {type: Schema.Types.ObjectId, ref: 'SubGenre'},
  bio: String,
  profilePicture: String,
  pieces: [{type: Schema.Types.ObjectId, ref: 'Pieces'}]
}, {
  timestamps: true
})

module.exports = mongoose.model('Composer', composerSchema)