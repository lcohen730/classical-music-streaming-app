const mongoose = require('mongoose')
const Schema = mongoose.Schema

const periodSchema = new Schema({
  name: { type: String, required: true },
  subGenres: [{type: Schema.Types.ObjectId, ref: 'SubGenre'}],
  instruments: [{type: Schema.Types.ObjectId, ref: 'Instrument'}],
  playlists: [{type: Schema.Types.ObjectId, ref: 'Playlist'}]
}, {
  timestamps: true
})

module.exports = mongoose.model('Period', periodSchema)