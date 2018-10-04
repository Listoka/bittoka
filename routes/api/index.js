const router = require('express').Router();
const postController = require('../../controllers/postController')
const commentController = require('../../controllers/commentController')

// post routes
router.route('/posts')
  .get(postController.findAll)
  .post(postController.create)

router.route('/posts/:id')
  .get(postController.findById)
  .put(postController.update)
  .delete(postController.remove)

// comment routes
router.route('/comments')
  .get(commentController.findAll)
  .post(commentController.create)

router.route('/comments/:id')
  .get(commentController.findById)
  .put(commentController.update)
  .delete(commentController.remove)

module.exports = router;