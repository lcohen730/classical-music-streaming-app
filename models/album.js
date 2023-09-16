const mongoose = require('mongoose')
const Schema = mongoose.Schema

const albumSchema = new Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  performers: [{type: Schema.Types.ObjectId, ref: 'Performer'}],
  pieces: [{type: Schema.Types.ObjectId, ref: 'Piece'}],
  instruments: [{type: Schema.Types.ObjectId, ref: 'Instrument'}]
}, {
  timestamps: true
})

module.exports = mongoose.model('Album', albumSchema)