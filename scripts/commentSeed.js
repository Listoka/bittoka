const mongoose = require("mongoose");
const db = require("../models");
const mockData = require('./mock-comment-data.json')
const asyncForEach = require('./helpers').asyncForEach
const fakeVoters = require('./helpers').fakeVoters

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bittokaDB');

const commentData = [
  { body: "Bitcoin has the potential to become the best and fairest form of money to ever exist." },
  { body: "Some guy named from class won't shut up about it." },
  { body: "A classmate asked me to join the group to build the platform" },
  { body: "Stay healthy forever. Be financially comfortable. Enjoy life." },
  { body: "Great advice can be tough to come by." },
  { body: "We all have people we look up to." },
  { body: "Insert a story about a haunted mansion here." },
  { body: "Insert a comical story here" },
  { body: "Insert Inspirational Story Here" },
];

// this is a mess, but basically we
//  1. make 9 top-level comments on a post
//  2. loop through a mock data file (currently 100 fake comment bodies)
//  3. for each comment body, randomly select a previously made comment, and
//  4. add a new comment as a reply to that comment
let initCommentPromises = db.Comment.deleteMany()
  .then(() => {

    // grab the post with the most votes, so we can easily find it.
    const dbPost = db.Post.aggregate([
      { $match: { isDraft: false } },
      { $addFields: { numVotes: { $size: '$voters' } } },
      { $sort: { numVotes: -1 } },
      { $limit: 1 }
    ]).then(result => result[0])

    return Promise.all([db.User.find(), dbPost])
  })
  .then(([dbUsers, dbPost]) => {
    let data = commentData.map(x => {
      let idx = Math.floor(dbUsers.length * Math.random())
      let author = dbUsers[idx]
      x.author = author._id
      x.authorName = author.username
      x.parentPost = dbPost._id
      x.voters = fakeVoters(21, author._id)
      return x
    })
    return Promise.all([db.Comment.insertMany(data), dbPost])
  })
  .then(([dbComments, dbPost]) => {
    let updatedPost = db.Post.findByIdAndUpdate(dbPost._id, { $inc: { numComments: 1 } })
    return Promise.all([dbComments, updatedPost])
  })
  .then(([dbComments, dbPost]) => {
    console.log('\n>>>>> Added Comments:\n', dbComments)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })

const doIt = async () => {
  await initCommentPromises
  await asyncForEach(mockData, item => {
    return db.Comment.find()
      .then(comments => {
        const comment = comments[Math.floor(Math.random() * comments.length)]
        return Promise.all([comment, db.User.find()])
      })
      .then(([parentComment, users]) => {
        const user = users[Math.floor(Math.random() * users.length)]
        const newCommentData = {
          body: item.body,
          author: user._id,
          authorName: user.username,
          ancestors: [...parentComment.ancestors, parentComment._id],
          parentPost: parentComment.parentPost,
          parentComment: parentComment._id,
          voters: fakeVoters(21, user._id)
        }
        return db.Comment.create(newCommentData)
      })
      // .then(dbComment => {
      //   return db.Post.findByIdAndUpdate(dbComment.parentPost, { $push: { comments: dbComment._id } })
      // })
      .then(dbComment => {
        return db.Post.findByIdAndUpdate(dbComment.parentPost, { $inc: { numComments: 1 } })
      })
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
  })

  console.log('\n>>>>> Added a bunch more comments..')
  process.exit(0)
}


doIt()