const commentController = require('../../controllers/commentController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

// comment routes
router.route('/comments') // TODO: this should probably be admin-only
  .get(commentController.findAll)

router.route('/comments/:id') 
  .get(commentController.findById)

router.route('/posts/:postId/comments/:commentId')
  .get((req, res) => {
    db.Comment
      .find({ parentComment: res.locals.comment._id })
      .then(dbComment => res.json(dbComment) )
      .catch(err => res.json(500, err))
  })

module.exports = router