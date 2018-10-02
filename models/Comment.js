import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  voters: [{type: ObjectId, ref: 'User'}],
  comments: [{type: ObjectId, ref: 'Comment'}],
  commentPath: {
    type: String,
    required: true
  }
})

CommentSchema.virtual('votes').get(() => this.voters.length)

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment