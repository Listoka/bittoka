const postController = require('../../controllers/postController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

router.route('/posts')
  .get(postController.findAll)

router.route('/posts/:id')
  .get(postController.findById)

router.route('/posts/:id/comments')
  .get(postController.getPostAndChildComments)

router.route('/posts/:id/comments/all')
  .get(postController.getAllPostComments)

module.exports = router