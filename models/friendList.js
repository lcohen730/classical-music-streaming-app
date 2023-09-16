const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friendListSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  friends: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
})

module.exports = mongoose.model('FriendList', friendListSchema)