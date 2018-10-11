const commentController = require('../../controllers/commentController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

// comment routes
router.route('/comments')
  .post(commentController.create)

// TODO: These should only be possible for the author
router.route('/comments/:id')
  .put(commentController.update)
  .delete(commentController.remove)

router.route('/comments/:id/vote')
  .get((req, res) => {
    const dbUser = res.locals.user.dbUser
    db.Comment.findByIdAndUpdate(req.params.id, { $push: { voters: dbUser._id } })
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  })

router.route('/posts/:postId/comments')
  .post((req, res) => {
    const dbUser = res.locals.user.dbUser
    const { body } = req.body
    const commentData = {
      body: body,
      parentPost: res.locals.post._id,
      commentPath: '',
      author: dbUser._id,
      authorName: dbUser.username
    }

    db.Comments
      .create(commentData)
      .then(dbComment => res.json(dbComment))
      .catch(err => res.status(500).json(err))
  })

router.route('/posts/:postId/comments/:commentId/comments')
  .post((req, res) => {
    const dbUser = res.locals.user.dbUser
    const { body } = req.body
    const commentData = {
      body: body,
      parentPost: res.locals.post._id,
      commentPath: res.locals.comment.commentPath + res.locals.comment._id,
      author: dbUser._id,
      authorName: dbUser.username
    }

    db.Comments
      .create(commentData)
      .then(dbComment => res.json(dbComment))
      .catch(err => res.status(500).json(err))
  })

module.exports = router