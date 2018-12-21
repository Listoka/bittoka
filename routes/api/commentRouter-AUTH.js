const commentController = require('../../controllers/commentController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

// comment routes

// TODO: this is a pointless route except maybe for testing.
router.route('/comments')
  .post(commentController.create)

// TODO: These actually be possible for both the author and an Admin
router.route('/comments/:commentId')
  .put((req, res) => {
    const dbUser = res.locals.user.dbUser
    const comment = res.locals.comment
    if (comment.author.equals(dbUser._id)) {
      const { body } = req.body
      db.Comment.findByIdAndUpdate(req.params.commentId, { body })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
    } else {
      res.sendStatus(403)
    }
  })
  .delete((req, res) => {
    const dbUser = res.locals.user.dbUser
    const comment = res.locals.comment
    if (comment.author.equals(dbUser._id)) {
      db.Comment.findByIdAndUpdate(req.params.commentId, { body: '[deleted]', authorName: '[deleted]' })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
    } else {
      res.sendStatus(403)
    }
  })

router.route('/comments/:id/vote')
  .get((req, res) => {
    const dbUser = res.locals.user.dbUser
    db.Comment.findByIdAndUpdate(req.params.id, { $push: { voters: dbUser._id } })
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  })

// TODO: currently just assumes that we receive a list of comment votes
// of the form [{authorId, commentId, moneyBtnId, cost}]
router.route('/votes')
  .post((req, res) => {
    console.log('>>>>> /votes req.body: ', req.body)
    const dbUser = res.locals.user.dbUser
    const votes = req.body
    const promises = votes.map(v => {
      return db.Comment.findByIdAndUpdate(v.commentId, { $push: { voters: dbUser._id } })
    })

    Promise.all(promises)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  })

router.route('/posts/:postId/comments')
  .post((req, res) => {
    if (res.locals.post.isDraft) {
      return res.status(403).json({ message: 'Cannot add comments to draft posts.' })
    }
    const dbUser = res.locals.user.dbUser
    const { body, parentComment } = req.body
    const commentData = {
      body,
      parentComment,
      parentPost: res.locals.post._id,
      author: dbUser._id,
      authorName: dbUser.username
    }

    if (parentComment) {
      db.Comment
        .findById(parentComment)
        .then(dbComment => {
          commentData.ancestors = [...dbComment.ancestors, dbComment._id]
          return db.Comment.create(commentData)
        })
        .then(dbComment => {
          return Promise.all([
            dbComment,
            db.Post.findByIdAndUpdate(res.locals.post._id, { $inc: { numComments: 1 } })
          ])
        })
        .then(([dbComment, dbPost]) => res.json(dbComment))
        .catch(err => res.status(500).json(err))
    } else {
      db.Comment
        .create(commentData)
        .then(dbComment => {
          return Promise.all([
            dbComment,
            db.Post.findByIdAndUpdate(res.locals.post._id, { $inc: { numComments: 1 } })
          ])
        })
        .then(([dbComment, dbPost]) => res.json(dbComment))
        .catch(err => res.status(500).json(err))
    }
  })

module.exports = router