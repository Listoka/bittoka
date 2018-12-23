// const userController = require('../../controllers/userController')
const router = require('express').Router();
// const authCheck = require('../../middleware/firebaseAuthMiddleware')
const db = require('../../models')

// TODO: Ensure this doesn't return draft posts unless the requester is the owner
router.get('/users/id/:id/posts', (req, res) => {
  let { limit, page } = req.query

  // TODO: This is really simple validation.. might need something better
  limit = limit ? parseInt(limit) : 10
  page = page ? parseInt(page) : 1

  db.Post.find({ author: req.params.id, isDraft: false })
    .skip((page - 1) * limit)
    .limit(limit)
    .then(dbPost => res.json(dbPost))
    .catch(err => res.status(500).json(err))
})

router.get('/users/id/:id/profile', (req, res) => {
  db.User
    .findById(req.params.id)
    .select('username bio moneyBtnId')
    .then(user => {
      let posts = db.Post.find({ author: user._id, isDraft: false })
      let comments = db.Comment.find({ author: user._id })
      return Promise.all([user, posts, comments])
    })
    .then(([user, posts, comments]) => {
      res.json({ user, posts, comments })
    })
    .catch(err => {
      console.log(`Route err - /users/${req.params.id}/profile\n`, err)
      res.status(500).json(err)
    })
})

router.get('/users/username/:username', (req, res) => {
  db.User
    .find({ username: req.params.username })
    .then(dbUser => {
      if (dbUser.length > 0) {
        res.json(true)
      } else {
        res.json(false)
      }
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router