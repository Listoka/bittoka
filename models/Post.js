const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PostSchema = new Schema({
  isDraft: { type: Boolean, default: false },
  title: {
    type: String,
    required: function () { return !this.isDraft }
  },
  body: { // should have a length limit
    type: String,
    required: function () { return !this.isDraft }
  },
  teaser: { // should have a length limit and a minimum?
    type: String,
  },
  tags: [String],
  author: { type: ObjectId, ref: 'User', required: true },
  authorName: { type: String },
  category: { type: ObjectId, ref: 'Category' },
  categoryName: { type: String },
  comments: [{ type: ObjectId, ref: 'Comment' }],
  voters: [{ type: ObjectId, ref: 'User' }],
  purchasers: [{ type: ObjectId, ref: 'User' }],
  paywallCost: { type: Number }
},
  {
    timestamps: true
  })

// PostSchema.virtual('votes').get(() => this.voters.length)
PostSchema.set('toJSON', { virtuals: true })

const Post = mongoose.model('Post', PostSchema)

module.exports = Post