const db = require('../models')

module.exports = {
  findAll: (req, res) => {
    db.Category
      .find()
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },

  findById: (req, res) => {
    db.Category
      .findById(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },

  findByName: (req, res) => {
    db.Category
      .findOne({ name: req.params.categoryName })
      .then(result => {
        res.json(result)
      })
      .catch(err => res.status(500).json(err))
  },

  findOne: (req, res) => {
    db.Category
      .findOne({ name: req.params.name })
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },

  create: (req, res) => {
    db.Category
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },

  update: (req, res) => {
    db.Category
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },

  remove: (req, res) => {
    db.Category
      .findByIdAndRemove(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err))
  },
}