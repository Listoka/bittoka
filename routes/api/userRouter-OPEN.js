// const userController = require('../../controllers/userController')
const router = require('express').Router();
// const authCheck = require('../../middleware/firebaseAuthMiddleware')
const db = require('../../models')

// TODO: Ensure this doesn't return draft posts unless the requester is the owner
router.get('/users/:id/posts', (req, res) => {
  db.Post.find({ author: req.params.id })
    .then(dbPost => res.json(dbPost))
    .catch(err => res.status(500).json(err))
})

router.get('/users/:id/profile', (req, res) => {
  db.User
    .findById(req.params.id)
    .select('username bio')
    .then(user => {
      let posts = db.Post.find({ author: user._id, isDraft: false })
      let comments = db.Comment.find({ author: user._id })
      return Promise.all([user, posts, comments])
    })
    .then(([user, posts, comments]) => {
      res.json({user, posts, comments})
    })
    .catch(err => {
      console.log(`Route err - /users/${req.params.id}/profile\n`, err)
      res.status(500).json(err)
    })
})


module.exports = router