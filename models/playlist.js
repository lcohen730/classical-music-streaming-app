const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new Schema({
  name: { type: String, required: true },
  dateCreated: {type: Date, required: true },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  pieces: [{type: Schema.Types.ObjectId, ref: 'Piece'}]
}, {
  timestamps: true
})

module.exports = mongoose.model('Playlist', playlistSchema)