// this middleware should come after the firebaseAuthMiddleware
// it assumes that there is a dbUser loaded at res.locals.user.dbUser
const group = require('../constants/permissionGroups')

const isAdmin = (req, res, next) => {
  console.log('>>>>> Inside isAdmin Middleware')
  console.log('res.locals ', res.locals)
  console.log('res.locals.user.dbUser ', res.locals.user.dbUser)
  const dbUser = res.locals.user.dbUser
  if (dbUser.permissions.includes(group.ADMIN)) {
    next()
  } else {
    res.status(403).json({ message: 'Admin Only' })
  }
}

const hasPermission = (condition, message) => {
  return (req, res, next) => {
    const dbUser = res.locals.user.dbUser
    if (condition(dbUser)) {
      next()
    } else {
      // TODO: I think this is borked
      !message
        ? res.sendStatus(403)
        : res.status(403).json({ mesage })
    }
  }
}

module.exports = { isAdmin, hasPermission }