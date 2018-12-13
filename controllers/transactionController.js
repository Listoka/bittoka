const db = require('../models')
const mongoose = require('mongoose')

// TODO: Change the error status codes to something other than "I'm a teapot"
module.exports = {
  findAll: (req, res) => {
    db.Transaction
      .find()
      .then(result => res.json(result))
      .catch(err => res.status(418).json(err))
  },

  findById: (req, res) => {
    db.Transaction
      .findById(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(418).json(err))
  },

  create: (req, res) => {
    console.log('transactionController req.body: ' + JSON.stringify(req.body))
    db.Transaction
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => {
        console.log('\n >>>>> Create Transaction ERR:\n', err)
        res.status(418).json(err)
      })
  },

  update: (req, res) => {
    db.Transaction
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(result => res.json(result))
      .catch(err => res.status(418).json(err))
  },

  remove: (req, res) => {
    db.Transaction
      .findByIdAndRemove(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(418).json(err))
  },

  totalAmtPaid: (req, res) => {
    db.Transaction
      .aggregate([{
        $group: {
          _id: { [req.params.userFieldName]: mongoose.Types.ObjectId(req.params.uid) },
          totalPaid: { $sum: { "$arrayElemAt": ["$txOutputs.amount", 1] } }
        }
      } // txOutputs[0]=listokaAcct, txOutputs[1]=userAcct
      ])
      .then(result => res.json(result))
      .catch(err => res.status(418).json(err))
  },

  totalReceivedByUser: (req, res) => {

  }
}