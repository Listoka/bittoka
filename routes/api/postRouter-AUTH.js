const postController = require('../../controllers/postController')
const router = require('express').Router();
const db = require('../../models')
const mongoose = require('mongoose')

require('./paramHelpers')(router)

router.route('/posts')
  .post((req, res) => {
    const dbUser = res.locals.user.dbUser
    const author = dbUser._id
    const authorName = dbUser.username
    const { title, teaser, body, tags, isDraft, categoryName, paywallCost } = req.body
    tags.sort()
    const postData = { author, authorName, title, teaser, body, tags, isDraft, categoryName, paywallCost }
    console.log('\n >>> CreatePost isDraft: ', isDraft)

    db.Post.create(postData)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log('\n >>> POST /posts ERR:\n', err)
        res.status(400).json(err)
      })
  })

router.route('/posts/:postId')
  .put((req, res) => {
    console.log('>>>>> Update Post: \n', req.body)
    const dbUser = res.locals.user.dbUser
    const dbPost = res.locals.post
    const { title, teaser, body, isDraft, tags, paywallCost, categoryName } = req.body
    const updateData = { title, teaser, body, isDraft, tags, categoryName, paywallCost }

    if (dbUser._id.equals(dbPost.author)) {
      db.Post
        .findByIdAndUpdate(req.params.postId, updateData)
        .then(dbPost => res.json(dbPost))
        .catch(err => {
          console.log(err)
          res.status(500).json(err)
        })
    } else {
      res.sendStatus(403)
    }
  })
  .delete((req, res) => {
    const dbUser = res.locals.user.dbUser
    const dbPost = res.locals.post
    if (dbUser._id.equals(dbPost.author)) {
      db.Post.findByIdAndRemove(req.params.postId)
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
    } else {
      res.sendStatus(403)
    }
  })

// TODO: add check to esure only one vote per user
router.route('/posts/:postId/vote')
  .get((req, res) => {
    const dbUser = res.locals.user.dbUser
    db.Post.findByIdAndUpdate(req.params.postId, { $push: { voters: dbUser._id } }, { new: true })
      .populate('voters')
      .then((result) => {
        res.json(result)
      })
  })

router.route('/posts/:id/purchase')
  .get((req, res) => {
    const dbUser = res.locals.user.dbUser
    db.Post.findByIdAndUpdate(req.params.id, { $push: { purchasers: dbUser._id } }, { new: true })
      .populate('purchasers')
      .then((result) => {
        res.json(result)
      })
  })

module.exports = router