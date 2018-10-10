// const userController = require('../../controllers/userController')
const router = require('express').Router();
// const authCheck = require('../../middleware/firebaseAuthMiddleware')
const db = require('../../models')

router.get('/users/:id/posts', (req, res) => {
  db.Post.find({ author: req.params.id })
    .then(dbPost => res.json(dbPost))
    .catch(err => res.status(500).json(err))
})


module.exports = router