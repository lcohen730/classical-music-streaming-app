const mongoose = require('mongoose')
const Schema = mongoose.Schema

const moodSchema = new Schema({
  name: { type: String, required: true },
  playlists: [{type: Schema.Types.ObjectId, ref: 'Playlist'}],
  composers: [{type: Schema.Types.ObjectId, ref: 'Composer'}],
  instruments: [{type: Schema.Types.ObjectId, ref: 'Instrument'}],
  mbtiTypes: [{type: Schema.Types.ObjectId, ref: 'MbtiTypes'}],
}, {
  timestamps: true
})

module.exports = mongoose.model('Mood', moodSchema)