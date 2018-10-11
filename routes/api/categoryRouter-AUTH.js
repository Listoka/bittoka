const categoryController = require('../../controllers/categoryController')
const router = require('express').Router();
const isAdmin = require('../../middleware/permissionMiddleware').isAdmin
// const db = require('../../models')

router.route('/categories')
  .post(isAdmin, categoryController.create)

router.route('/categories/id/:id')
  .put(isAdmin, categoryController.update)
  .delete(isAdmin, categoryController.remove)


module.exports = router