const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TransactionSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  paidUserId: {
    type: ObjectId,
    ref: 'User'
  },
  txFrom: { // originating moneybutton id
    type: String,
    required: true
  },
  txType: {
    type: String,
    enum: ['comment-vote', 'post-vote', 'purchase', 'tip', 'comment', 'post'],
    required: true
  },
  txOutputs: {
    type: [{ moneybuttonId: String, amount: Number }],
  },
  batch: {
    type: Boolean,
    default: false
  },
  commentList: {
    type: [{
      commentId: {
        type: ObjectId,
        ref: 'Comment'
      },
      userId: {
        type: ObjectId,
        ref: 'User'
      }
    }],
    required: () => this.batch && this.txType === 'comment-vote'
  },
  commentId: {
    type: ObjectId,
    ref: 'Comment',
    required: () => (this.txType === 'comment' || this.txType === 'comment-vote') && !this.batch
  },
  postId: {
    type: ObjectId,
    ref: 'Post',
    required: () => {
      return (this.txType === 'post' ||
        this.txType === 'post-vote' ||
        this.txType === 'purchase') && !this.batch
    }
  }
},
  {
    timestamps: true
  })

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction