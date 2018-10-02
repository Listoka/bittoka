const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  uid: {  // firebase generated user id
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [String], // array of string identifiers for permission groups
  comments: [{ type: ObjectId, ref: 'Comment' }],
  commentVotes: [{ type: ObjectId, ref: 'Comment' }],
  posts: [{ type: ObjectId, ref: 'Post' }],
  postVotes: [{ type: ObjectId, ref: 'Post' }],
  purchases: [{ type: ObjectId, ref: 'Post' }],

  // transactions: [{ type: ObjectId, ref: 'Transaction'}]

})

const User = mongoose.model('User', UserSchema)

module.exports = User