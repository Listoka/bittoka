const commentController = require('../../controllers/commentController')
const router = require('express').Router();
const db = require('../../models')

// comment routes
router.route('/comments')
  .post(commentController.create)

router.route('/comments/:id')
  .put(commentController.update)
  .delete(commentController.remove)

router.route('/posts/:postId/comments')
  .post((req, res) => {
    const commentData = req.body
    commentData.parentPost = res.locals.post._id
    commentData.commentPath = ''

    db.Comments
      .create(commentData)
      .then(dbComment => res.json(dbComment))
      .catch(err => res.json(500, err))
  })

router.route('/posts/:postId/comments/:commentId/comments')
  .post((req, res) => {
    const commentData = req.body
    commentData.parentPost = res.locals.post._id
    commentData.parentComment = res.locals.comment._id
    commentData.commentPath = res.locals.comment.commentPath + res.locals.comment._id

    db.Comments
      .create(commentData)
      .then(dbComment => res.json(dbComment))
      .catch(err => res.json(500, err))
  })

module.exports = router