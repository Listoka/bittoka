const db = require('../models')

module.exports = {
  findAll: (req, res) => {
    db.User
      .find()
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },

  findById: (req, res) => {
    db.User
      .findById(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },

  create: (req, res) => {
    db.User
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },

  update: (req, res) => {
    db.User
      .findOneAndUpdate({_id: req.params.id}, req.body)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },

  remove: (req, res) => {
    db.User
      .findByIdAndRemove(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },
}