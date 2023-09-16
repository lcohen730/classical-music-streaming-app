const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mbtiTypeSchema = new Schema({
  name: {type: String, required: true},
  moods: {type: Schema.Types.ObjectId, ref: 'Mood'}
}, {
  timestamps: true
})

module.exports = mongoose.model('MbtiType', mbtiTypeSchema)