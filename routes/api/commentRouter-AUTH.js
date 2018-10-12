const commentController = require('../../controllers/commentController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

// comment routes
router.route('/comments')
  .post(commentController.create)

// TODO: These should only be possible for the author
// TODO: These actually be possible for both the author and an Admin
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
      author: dbUser._id,
      authorName: dbUser.username
    }

    db.Comment
      .create(commentData)
      .then(dbComment => {
        let dbPost = db.Post.findByIdAndUpdate(res.locals.post._id, { $push: { comments: dbComment._id } })
        return Promise.all([dbComment, dbPost])
      })
      .then((results) => {
        res.json(results[0])
      })
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
      .then(dbComment => res.json(dbComment))
      .catch(err => res.status(500).json(err))
  })

module.exports = router