const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subGenreSchema = new Schema({
  name: { type: String, required: true },
  period: {type: Schema.Types.ObjectId, ref: 'Period'},
  moods: [{type: Schema.Types.ObjectId, ref: 'Mood'}],
  composers: [{type: Schema.Types.ObjectId, ref: 'Composer'}],
  playlists: [{type: Schema.Types.ObjectId, ref: 'Playlist'}]
}, {
  timestamps: true
})

module.exports = mongoose.model('SubGenre', subGenreSchema)