const db = require('../models')

// TODO: Change the error status codes to something other than "I'm a teapot"
module.exports = {
  findAll: (req, res) => {
    db.Post
      .find()
      .then(result => res.json(result))
      .catch(err => res.status(418).json(err))
  },

  findById: (req, res) => {
    db.Post
      .findById(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(418).json(err))
  },

  create: (req, res) => {
    db.Post
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(418).json(err))
  },

  update: (req, res) => {
    db.Post
      .findOneAndUpdate({_id: req.params.id}, req.body)
      .then(result => res.json(result))
      .catch(err => res.status(418).json(err))
  },

  remove: (req, res) => {
    db.Post
      .findByIdAndRemove(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(418).json(err))
  },
}