const mongoose = require("mongoose");
const db = require("../models");
const helpers = require('./helpers')

const { asyncForEach, randomDate } = helpers

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bittokaDB');

const listokaAcctNum = '783'

const getUsers = () => {
  return db.User.find()
}

const getPosts = () => {
  return db.Post.find().populate('author')
}

const getComments = () => {
  return db.Comment.find().populate('author')
}

const deleteTransactions = () => {
  return db.Transaction.deleteMany()
}

// TODO: note that this currently does not do the other step of actually adding
// a user to the comment as a voter
const seedCommentTransactions = async () => {
  const users = await getUsers()
  const comments = await getComments()

  for (let user of users) {
    let remainingComments = comments
    const votedComments = {}
    const batch = []

    const createTransaction = (comments) => {
      return makeCommentTransaction(user, comments)
    }

    for (let i = 0; i < 15; i++) { // arbitrary number of transactions to make
      const selectedComments = []
      remainingComments = remainingComments.filter(c => !votedComments[c._id])

      // pick a random number of comments to vote on, up to 10
      // and defend against the case that we don't have enough comments left to vote on
      let numberToPick = (remainingComments.length > 10) ? 10 : remainingComments.length
      numberToPick = Math.ceil(Math.random() * numberToPick)
      while (selectedComments.length < numberToPick) {
        // pick a random comment
        let c = remainingComments[Math.floor(Math.random() * remainingComments.length)]

        // check if we've already selected the comment
        // note, we don't check if this comment is our own...
        if (selectedComments.find(x => x._id === c._id)) continue

        // if not, add it to our selected array
        selectedComments.push(c)
      }

      batch.push(selectedComments)
      selectedComments.forEach(c => votedComments[c._id] = true)
    }

    await asyncForEach(batch, createTransaction)
  }
}

const makeCommentTransaction = (fromUser, comments) => {
  let txOutputs = comments.map(c => {
    return {
      moneyBtnId: c.author.moneyBtnId,
      amount: 0.02,
      userId: c.author._id,
      commentId: c._id,
    }
  })

  let listokaOutput = {
    moneyBtnId: listokaAcctNum,
    amount: comments.length * 0.01,
    isListokaAcct: true
  }

  txOutputs = [...txOutputs, listokaOutput]

  const data = {
    fromUser: fromUser._id,
    batch: true,
    txFrom: fromUser.moneyBtnId,
    txType: 'comment-vote',
    raw: 'fake transaction!!',
    txOutputs: txOutputs,
    createdAt: randomDate()
  }

  return db.Transaction.create(data)
}

async function seed() {
  await deleteTransactions()

  try {
    await seedCommentTransactions()
  }
  catch (err) {
    console.log('\n seed Err: ', err)
    process.exit(1)
  }

  process.exit(0)
}

seed()