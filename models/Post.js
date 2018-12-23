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
  categoryName: { type: String }, // TODO: we could get this by populating category..
  numComments: { type: Number, default: 0 },
  // TODO: voters should be backed by Transactions, not maintained separately
  // but it turns out that is very, very expensive to call while sorting
  // the better method is probably to increment a 'numVoters' property here
  // each time we create a relevant transaction
  voters: [{ type: ObjectId, ref: 'User' }],
  purchasers: [{ type: ObjectId, ref: 'User' }], // TODO: this should be backed by transactions, not maintained separately
  paywallCost: { type: Number, default: 0 }
},
  {
    timestamps: true
  })

PostSchema.set('toJSON', { virtuals: true })

const Post = mongoose.model('Post', PostSchema)

module.exports = Post