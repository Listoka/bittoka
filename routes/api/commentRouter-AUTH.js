const commentController = require('../../controllers/commentController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

// comment routes
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

router.route('/posts/:postId/comments')
  .post((req, res) => {
    if (res.locals.post.isDraft) {
      return res.status(403).json({message: 'Cannot add comments to draft posts.'})
    }
    const dbUser = res.locals.user.dbUser
    const { body } = req.body
    const commentData = {
      body: body,
      parentPost: res.locals.post._id,
      author: dbUser._id,
      authorName: dbUser.username
    }

    db.Comment
      .create(commentData)
      .then(dbComment => {
        return Promise.all([
          dbComment,
          db.Post.findByIdAndUpdate(res.locals.post._id, { $push: { comments: dbComment._id } })
        ])
      })
      .then(([dbComment, dbPost]) => res.json(dbComment))
      .catch(err => res.status(500).json(err))
  })

router.route('/comments/:commentId/comments')
  .post((req, res) => {
    const dbUser = res.locals.user.dbUser
    const { body } = req.body
    const commentData = {
      body: body,
      parentPost: res.locals.comment.parentPost,
      commentPath: res.locals.comment.commentPath + res.locals.comment._id + '/',
      author: dbUser._id,
      authorName: dbUser.username
    }

    db.Comment
      .create(commentData)
      .then(dbComment => {
        return Promise.all([
          dbComment,
          db.Comment.findByIdAndUpdate(res.locals.comment._id, { $push: { comments: dbComment._id } })
        ])
      })
      .then(([dbComment, parentComment]) => res.json(dbComment))
      .catch(err => res.status(500).json(err))
  })

module.exports = router