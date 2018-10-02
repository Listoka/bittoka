import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tags: [String],
  author: { type: ObjectId, ref: 'User', required: true },
  category: { type: ObjectId, ref: 'Category', required: true },
  comments: [{ type: ObjectId, ref: 'Comment'}],
  voters: [{type: ObjectId, ref: 'User'}],
  purchasers: [{type: ObjectId, ref: 'User'}],
})

PostSchema.virtual('votes').get(() => this.voters.length)

const Post = mongoose.model('Post', PostSchema)

export default Post