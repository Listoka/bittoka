const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: { // should have a length limit
    type: String,
    required: true
  },
  teaser: { // should have a length limit and a minimum?
    type: String,
    required: true
  },
  tags: [String],
  author: { type: ObjectId, ref: 'User', required: true },
  authorName: { type: String },
  category: { type: ObjectId, ref: 'Category' },
  categoryName: { type: String },
  comments: [{ type: ObjectId, ref: 'Comment' }],
  voters: [{ type: ObjectId, ref: 'User' }],
  purchasers: [{ type: ObjectId, ref: 'User' }],
  isDraft: { type: Boolean, default: false }
},
  {
    timestamps: true
  })

PostSchema.virtual('votes').get(() => this.voters.length)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post