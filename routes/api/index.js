const router = require('express').Router();
const postController = require('../../controllers/postController')
const commentController = require('../../controllers/commentController')
const categoryController = require('../../controllers/categoryController')
const transactionController = require('../../controllers/transactionController')

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

// category routes
router.route('/categories')
  .get(categoryController.findAll)
  .post(categoryController.create)

router.route('/categories/:id')
  .get(categoryController.findById)
  .put(categoryController.update)
  .delete(categoryController.remove)

router.route('/category/info/:name')
  .get(categoryController.findOne)

router.route('/category/:categoryName/posts')
  .get(postController.findAllInCategory)

// transaction routes
router.route('/transactions')
  .get(transactionController.findAll)
  .post(transactionController.create)

router.route('/transactions/:id')
  .get(transactionController.findById)
  .put(transactionController.update)
  .delete(transactionController.remove)

router.route('/users/:id/posts')
  .get(postController.findByAuthorId)

module.exports = router;