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
  bio: {
    type: String
  },
  permissions: [String], // array of string identifiers for permission groups
  moneyBtnId: String // will be required
},
{
  timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = User