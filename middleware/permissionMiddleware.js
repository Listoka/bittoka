// this middleware should come after the firebaseAuthMiddleware
// it assumes that there is a dbUser loaded at res.locals.user.dbUser
const group = require('../constants/permissionGroups')

const isAdmin = (req, res, next) => {
  const dbUser = res.locals.user.dbUser
  if (dbUser.permissions.includes(group.ADMIN)) {
    next()
  } else {
    res.status(401).json({ message: 'Admin Only' })
  }
}

const hasPermission = (condition, message) => {
  return (req, res, next) => {
    const dbUser = res.locals.user.dbUser
    if (condition(dbUser)) {
      next()
    } else {
      !message
        ? res.sendStatus(401)
        : res.status(401).json({ mesage })
    }
  }
}

module.exports = { isAdmin, hasPermission }