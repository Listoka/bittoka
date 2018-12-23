const db = require('../models')

module.exports = {
  findAll: (req, res) => {
    db.Post
      .find()
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },

  findById: (req, res) => {
    db.Post
      .findById(req.params.id)
      .populate('numC')
      .then(result => {
        console.log(result)
        if (!result) {
          res.status(404)
        } else {
          res.json(result)
        }
      })
      .catch(err => res.status(500).json(err))
  },

  findByAuthorId: (req, res) => {
    db.Post.find({ author: req.params.id })
      .then(dbPost => {
        if (!dbPost || dbPost.length < 1) {
          res.json([])
        } else {
          res.json(dbPost)
        }
      })
      .catch(err => res.status(500).json(err))
  },

  // getPostAndChildComments: (req, res) => {
  //   db.Post.findById(req.params.id)
  //     .populate('comments')
  //     .populate('voters')
  //     .then(dbPost => {
  //       res.json(dbPost)
  //     })
  //     .catch(err => res.status(500).json(err))
  // },

  getAllPostComments: (req, res) => {
    db.Comment.find({ parentPost: req.params.id })
      .then(comments => {
        if (!comments || comments.length < 1) {
          res.json([])
        } else {
          res.json(comments)
        }
      })
      .catch(err => res.status(500).json(err))
  },

  create: (req, res) => {
    db.Post
      .create(req.body)
      .then(result => {
        res.json(result)
      })
      .catch(err => res.status(500).json(err))
  },

  update: (req, res) => {
    db.Post
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },

  remove: (req, res) => {
    db.Post
      .findByIdAndRemove(req.params.postId)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },
}