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
  txStatus: {
    type: String,
    enum: ['pending', 'complete'],
    default: 'pending',
  },
  txOutputs: {
    type: [{ moneybuttonId: String, amount: Number }],
  },
  commentId: {
    type: ObjectId,
    ref: 'Comment',
    required: () => this.txType === 'comment' || this.txType === 'comment-vote'
  },
  postId: {
    type: ObjectId,
    ref: 'Post',
    required: () => {
      return this.txType === 'post' ||
        this.txType === 'post-vote' ||
        this.txType === 'purchase'
    }
  }
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction