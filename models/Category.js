import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  posts: [{ type: ObjectId, ref: 'Post' }],
  tags: [String],
  settings: {
    allowedPosters: { type: [String], required: true }, // string identifiers for permission groups
    defaultContentPrice: { type: Number, required: true },
    posterSetsContentPrice: { type: Boolean, default: true },
    costToComment: { type: Number, required: true },
    costToPost: { type: Number, required: true }
  }
})

const Category = mongoose.model('Category', CategorySchema)

export default Category