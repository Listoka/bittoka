const postController = require('../../controllers/postController')
const router = require('express').Router();
const authCheck = require('../../middleware/firebaseAuthMiddleware')
const db = require('../../models')

router.route('/posts')
  .get(postController.findAll)
  .post(authCheck, postController.create)

router.route('/posts/:id')
  .get(postController.findById)
  .put(authCheck, postController.update)
  .delete(authCheck, postController.remove)

router.route('/posts/:id/comments')
  .get(postController.getPostAndChildComments)

router.route('/posts/:id/comments/all')
  .get(postController.getAllPostComments)

module.exports = router