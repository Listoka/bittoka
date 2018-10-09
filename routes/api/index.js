const router = require('express').Router();
const postController = require('../../controllers/postController')
const commentController = require('../../controllers/commentController')
const categoryController = require('../../controllers/categoryController')
const transactionController = require('../../controllers/transactionController')
const db = require('../../models')

router.param('categoryName', function (req, res, next, categoryName) {
  db.Category.findOne({ name: categoryName })
    .then(dbCategory => {
      if (!dbCategory || dbCategory.length < 1) {
        res.json(404, { message: 'Unknown Category' })
      } else {
        res.locals.dbCategory = dbCategory
        next()
      }
    })
    .catch(err => {
      console.log(err)
      res.json(400, { message: 'router.param error for :categoryName' })
    })
})

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

router.route('/categories/info/:name')
  .get(categoryController.findOne)

router.route('/categories/:categoryName/posts')
  .get((req, res) => {
    console.log('locals ', res.locals.dbCategory)
    db.Post.find({ categoryName: res.locals.dbCategory.name })
      .then(dbPost => {
        res.json({
          category: res.locals.dbCategory,
          posts: dbPost
        })
      })
  })
  // .get(postController.findAllInCategory)

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