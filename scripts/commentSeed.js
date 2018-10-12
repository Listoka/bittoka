const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bittokaDB");

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

db.Comment.deleteMany()
  .then(() => {
    return Promise.all([db.User.find(), db.Post.findOne()])
  })
  .then(([dbUsers, dbPost]) => {
    let data = commentData.map(x => {
      let idx = Math.floor(dbUsers.length * Math.random())
      let author = dbUsers[idx]
      x.author = author._id
      x.authorName = author.username
      x.parentPost = dbPost._id
      return x
    })
    return Promise.all([db.Comment.insertMany(data), dbPost])
  })
  .then(([dbComments, dbPost]) => {
    let commentIds = dbComments.map(x => x._id)
    let updatedPost = db.Post.findByIdAndUpdate(dbPost._id, { $push: { comments: { $each: commentIds } } })
    return Promise.all([dbComments, updatedPost])
  })
  .then(([dbComments, dbPost]) => {
    console.log('\n>>>>> Added Comments:\n', dbComments)
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })