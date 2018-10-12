const admin = require('firebase-admin')
const db = require('../models/')

const ACTIVATE = true
// const ACTIVATE = false

function firebaseAuthMiddleware(req, res, next) {
  const authorization = req.header('Authorization')
  if (authorization) {
    console.log('>>>>> AUTH Middleware - AUTHORIZATION HEADER:\n', authorization)
    const token = authorization.split(' ')[1]
    admin.auth().verifyIdToken(token)
      .then(decodedToken => {
        console.log('>>>>> AUTH Middleware - decodedToken\n', decodedToken)
        return Promise.all([decodedToken, db.User.findOne({ uid: decodedToken.uid })])
      })
      .then(([token, dbUser]) => {
        res.locals.user = { token, dbUser }
        next()
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(401)
      })
  } else {
    console.log('>>>>> AUTH Middleware - Authorization header not found')
    res.sendStatus(401)
  }
}

function emptyMiddleware(req, res, next) {
  next()
}

module.exports = ACTIVATE ? firebaseAuthMiddleware : emptyMiddleware