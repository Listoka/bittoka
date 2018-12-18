const categoryController = require('../../controllers/categoryController')
const categoryRouter = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(categoryRouter)

categoryRouter.route('/categories')
  .get(categoryController.findAll)
// .post(authCheck, categoryController.create)

categoryRouter.route('/categories/id/:id')
  .get(categoryController.findById)
// .put(authCheck, categoryController.update)
// .delete(authCheck, categoryController.remove)

categoryRouter.route('/categories/:categoryName')
  .get(categoryController.findByName)

categoryRouter.route('/categories/info/:name')
  .get(categoryController.findOne)

categoryRouter.get('/categories/id/:categoryId', function (req, res) {
  db.Category.findById(req.params.categoryId)
    .then(dbCategory => {
      !dbCategory
        ? res.sendStatus(404)
        : res.json(dbCategory)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

categoryRouter.get('/categories/:categoryName/posts', function (req, res) {
  let { limit, page } = req.query

  // TODO: This is really simple validation.. might need something better
  limit = limit ? parseInt(limit) : 10
  page = page ? parseInt(page) : 1

  db.Post.find({ categoryName: res.locals.category.name, isDraft: false })
    .skip((page - 1) * limit)
    .limit(limit)
    .then(dbPost => {
      if (!dbPost || dbPost.length < 1) {
        return []
      } else {
        return dbPost
      }
    })
    .then(dbPost => {
      res.json({ category: res.locals.category, posts: dbPost })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

module.exports = categoryRouter