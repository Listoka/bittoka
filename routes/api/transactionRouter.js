const transactionController = require('../../controllers/transactionController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

// transaction routes
router.route('/transactions')
  .get(transactionController.findAll)
  .post(transactionController.create)

router.route('/transactions/:id')
  .get(transactionController.findById)
  .put(transactionController.update)
  .delete(transactionController.remove)


module.exports = router