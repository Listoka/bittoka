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

router.put('/users/id/:id', (req, res) => {
  const dbUser = res.locals.user.dbUser
  if (dbUser._id.toString() !== req.params.id) {
    return res.sendStatus(403)
  }
  const { bio, moneyBtnId } = req.body
  db.User.findByIdAndUpdate(dbUser._id, { bio, moneyBtnId })
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.log(`\n >>> Route Err - /users/id/${req.params.id}\n`, err)
      res.status(500).json(err)
    })
})

router.get('/users/id/:id/posts/drafts', (req, res) => {
  const dbUser = res.locals.user.dbUser
  if (dbUser._id.toString() !== req.params.id) {
    return res.status(403).send('You can only see your own drafts!')
  }
  db.Post.find({ author: dbUser._id, isDraft: true })
    .then(result => res.json(result))
    .catch(err => {
      console.log(`\n >>> Route Err - /users/id/${req.params.id}/posts/drafts \n`, err)
      res.status(500).json(err)
    })
})

router.post('/users', (req, res) => {
  console.log('\n>>> POST -- req.originalUrl: ', req.originalUrl)
  console.log('>>> POST -- req.body: \n', req.body)
  console.log('>>> POST -- res.locals\n', res.locals)
  const { username, moneyBtnId } = req.body
  const userData = {
    username: username,
    email: res.locals.user.token.email,
    uid: res.locals.user.token.uid,
    permissions: ['user'],
    moneyBtnId: moneyBtnId
  }

  db.User.find({ username })
    .then(result => {
      if (result.length > 0) {
        res.status(400).send('Error: Username taken.')
      } else {
        return db.User.create(userData)
      }
    })
    .then(result => {
      res.json(result)
    })
})

module.exports = router