const postController = require('../../controllers/postController')
const router = require('express').Router();
const db = require('../../models')
const mongoose = require('mongoose')

require('./paramHelpers')(router)

const byMap = new Map([
  ['votes', 'numVotes'],
  ['time', 'createdAt']
])

const sortOrder = {
  'asc': 1,
  'desc': -1
}

router.route('/posts')
  .get((req, res) => {
    console.log('\n>>>> GET /posts req.query: ', req.query)
    let { limit, page, order, by, category, days, userId, tags } = req.query

    // TODO: This is really simple validation.. might need something better
    limit = limit ? parseInt(limit) : 10
    page = page ? parseInt(page) : 1
    days = days ? parseInt(days) : -1
    order = (order === 'asc' || order === 'desc') ? sortOrder[order] : sortOrder['desc']
    by = byMap.has(by) ? byMap.get(by) : byMap.get('votes')
    // tags = tags ? tags.split(',') : null

    let date
    if (days < 0) {
      date = new Date(-1)
    } else {
      date = new Date()
      date.setDate(date.getDate() - days - 1)
    }

    const matchArgs = {
      isDraft: false,
      createdAt: { $gte: date }
    }

    if (category) matchArgs.categoryName = category
    if (userId) matchArgs.author = mongoose.Types.ObjectId(userId)
    // if (tags) matchArgs.tags = { $setEquals: ['$tags', tags] }

    db.Post.aggregate([
      { $match: matchArgs },
      {
        $addFields: {
          numVotes: { $size: '$voters' },
          numPurchasers: { $size: '$purchasers' }
        }
      },
      { $sort: { [by]: order } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'parentPost',
          as: 'comments',
        }
      },
      { $addFields: { numComments: { $size: '$comments' } } },
      { $project: { comments: false, purchasers: false } }
    ])
      .then(posts => res.json(posts))
      .catch(err => {
        console.log('\n>>>>> GET /posts ERR: ', err)
        res.status(500).json(err)
      })
  })

router.route('/posts/:id')
  .get(postController.findById)

// returns a Post with its top-level comments populated
// router.route('/posts/:id/comments')
//   .get(postController.getPostAndChildComments)

// returns all comments associated with the post
router.route('/posts/:id/comments/')
  .get(postController.getAllPostComments)


module.exports = router