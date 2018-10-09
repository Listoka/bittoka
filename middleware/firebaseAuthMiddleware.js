const admin = require('firebase-admin')

function firebaseAuthMiddleware(req, res, next) {
  const authorization = req.header('Authorization')
  if (authorization) {
    console.log('AUTHORIZATION HEADER:\n', authorization)
    const token = authorization.split(' ')[1]
    admin.auth().verifyIdToken(token)
      .then(decodedToken => {
        console.log(decodedToken)
        res.locals.user = decodedToken
        next()
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(401)
      })
  } else {
    console.log('Authorization header not found')
    res.sendStatus(401)
  }
}

module.exports = firebaseAuthMiddleware