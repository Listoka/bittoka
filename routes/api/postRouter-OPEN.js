const postController = require('../../controllers/postController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

router.route('/posts')
  .get((req, res) => {
    db.Post
      .find({isDraft: false})
      .then(posts => res.json(posts))
      .catch(err => res.status(500).json(err))
  })

router.route('/posts/:id')
  .get(postController.findById)

// returns a Post with its top-level comments populated
router.route('/posts/:id/comments')
  .get(postController.getPostAndChildComments)

// returns all comments associated with the post
router.route('/posts/:id/comments/all')
  .get(postController.getAllPostComments)

module.exports = router