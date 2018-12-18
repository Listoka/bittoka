const postController = require('../../controllers/postController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

router.route('/posts')
  .get((req, res) => {
    let { limit, page } = req.query

    // TODO: This is really simple validation.. might need something better
    limit = limit ? parseInt(limit) : 10
    page = page ? parseInt(page) : 1

    db.Post
      .find({ isDraft: false })
      .skip((page - 1) * limit)
      .limit(limit)
      .then(posts => res.json(posts))
      .catch(err => {
        console.log('\n>>>>> GET /posts ERROR:\n', err)
        res.status(500).json(err)
      })
  })

router.route('/posts/:id')
  .get(postController.findById)

// returns a Post with its top-level comments populated
router.route('/posts/:id/comments')
  .get(postController.getPostAndChildComments)

// returns all comments associated with the post
router.route('/posts/:id/comments/all')
  .get(postController.getAllPostComments)

module.exports = router