const postController = require('../../controllers/postController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

// TODO: this route should exclude any post that is a draft
router.route('/posts')
  .get(postController.findAll)

router.route('/posts/:id')
  .get(postController.findById)

// returns a Post with its top-level comments populated
router.route('/posts/:id/comments')
  .get(postController.getPostAndChildComments)

// returns all comments associated with the post
router.route('/posts/:id/comments/all')
  .get(postController.getAllPostComments)

module.exports = router