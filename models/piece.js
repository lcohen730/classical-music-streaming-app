const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pieceSchema = new Schema({
  name: { type: String, required: true },
  composer: {type: Schema.Types.ObjectId, ref: 'Composer'},
  performers: [{type: Schema.Types.ObjectId, ref: 'Performer'}],
  length: { type: String, required: true },
  subGenre: {type: Schema.Types.ObjectId, ref: 'SubGenre'},
  moods: [{type: Schema.Types.ObjectId, ref: 'Mood'}],
  playlists: [{type: Schema.Types.ObjectId, ref: 'Playlist'}],
  album: {type: Schema.Types.ObjectId, ref: 'Album'}
}, {
  timestamps: true
})

module.exports = mongoose.model('Piece', pieceSchema)