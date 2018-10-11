const userController = require('../../controllers/userController')
const router = require('express').Router();
const db = require('../../models')

router.get('/users/id/:id', userController.findById)

router.get('/users/uid/:uid', (req, res) => {
  console.log('>>> GET uid -- req.originalUrl: ', req.originalUrl)
  db.User.findOne({ uid: req.params.uid }).then(dbUser => {
    res.json(dbUser)
  })
})

router.post('/users', (req, res) => {
  console.log('>>> POST -- req.originalUrl: ', req.originalUrl)
  console.log('>>> POST -- req.body: ', req.body)
  const { username } = req.body
  const userData = {
    username: username,
    email: res.locals.user.email,
    uid: res.locals.user.uid,
    permissions: ['user']
  }
  db.User.create(userData).then(result => {
    res.json(result)
  })
})

module.exports = router