const postController = require('../../controllers/postController')
const router = require('express').Router();
// const db = require('../../models')

router.route('/posts')
  .post(postController.create)

router.route('/posts/:id')
  .put(postController.update)
  .delete(postController.remove)

module.exports = router