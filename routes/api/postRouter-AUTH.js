const postController = require('../../controllers/postController')
const router = require('express').Router();
const db = require('../../models')

router.route('/posts')
  .post((req, res) => {
    const dbUser = res.locals.user.dbUser
    const author = dbUser._id
    const authorName = dbUser.username
    const { title, teaser, body, tags } = req.body
    const postData = { author, authorName, title, teaser, body, tags }

    db.Post.create(postData)
      .then(result => {
        res.json(result)
      })
  })

// TODO: These should only be allowed if user === author
router.route('/posts/:id')
  .put(postController.update)
  .delete(postController.remove)

router.route('/posts/:id/vote')
  .get((req, res) => {
    const dbUser = res.locals.user.dbUser
    db.Post.findByIdAndUpdate(req.params.id, { $push: { voters: dbUser._id } })
  })
module.exports = router