const postController = require('../../controllers/postController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

router.route('/posts')
  .post((req, res) => {
    const dbUser = res.locals.user.dbUser
    const author = dbUser._id
    const authorName = dbUser.username
    const { title, teaser, body, tags, isDraft, categoryName } = req.body
    const postData = { author, authorName, title, teaser, body, tags, isDraft, categoryName }

    db.Post.create(postData)
      .then(result => {
        res.json(result)
      })
      .catch(err => res.status(400).json(err))
  })

router.route('/posts/:postId')
  .put((req, res) => {
    const dbUser = res.locals.user.dbUser
    const dbPost = res.locals.post
    const { title, teaser, body, isDraft, tags } = req.body
    const updateData = { title, teaser, body, isDraft, tags }

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
  .delete(postController.remove)

// TODO: add check to esure only one vote per user
router.route('/posts/:id/vote')
  .get((req, res) => {
    const dbUser = res.locals.user.dbUser
    db.Post.findByIdAndUpdate(req.params.id, { $push: { voters: dbUser._id } })
  })
module.exports = router