const categoryController = require('../../controllers/categoryController')
const router = require('express').Router();
// const db = require('../../models')

// TODO: Make these routes admin-only

router.route('/categories')
  .post(categoryController.create)

router.route('/categories/id/:id')
  .put(categoryController.update)
  .delete(categoryController.remove)


module.exports = router