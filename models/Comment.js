const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
  author: { type: ObjectId, ref: 'User' },
  authorName: { type: String },
  body: { type: String, required: true },
  parentPost: { type: ObjectId, ref: 'Post' },
  parentComment: { type: ObjectId, ref: 'Comment' },
  voters: [{ type: ObjectId, ref: 'User' }],
  comments: [{ type: ObjectId, ref: 'Comment' }],
  commentPath: { type: String, default: '/' }
},
  {
    timestamps: true
  })

CommentSchema.virtual('votes').get(() => this.voters.length)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment