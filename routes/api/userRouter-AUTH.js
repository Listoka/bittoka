const userController = require('../../controllers/userController')
const router = require('express').Router();
const db = require('../../models')

router.get('/users/id/:id', userController.findById)

router.get('/users/uid/:uid', (req, res) => {
  db.User.findOne({ uid: req.params.uid }).then(dbUser => {
    res.json(dbUser)
  })
})

router.post('/users', (req, res) => {
  const { username } = req.body
  const userData = {
    username: username,
    email: res.locals.user,
    uid: uid,
    permissions: ['user']
  }
  db.User.create(userData).then(result => {
    res.json(result)
  })
})

module.exports = router