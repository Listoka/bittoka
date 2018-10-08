const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [String],
  settings: {
    allowedPosters: { type: [String], required: true }, // string identifiers for permission groups
    defaultContentPrice: { type: Number, required: true },
    posterSetsContentPrice: { type: Boolean, default: true },
    costToComment: { type: Number, required: true },
    costToPost: { type: Number, required: true }
  }
},
{
  timestamps: true
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category