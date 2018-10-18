const router = require('express').Router();
const authCheck = require('../../middleware/firebaseAuthMiddleware')

const categoryRouter = require('./categoryRouter-OPEN')
const categoryRouter_AUTH = require('./categoryRouter-AUTH')
const postRouter = require('./postRouter-OPEN')
const postRouter_AUTH = require('./postRouter-AUTH')
const commentRouter = require('./commentRouter-OPEN')
const commentRouter_AUTH = require('./commentRouter-AUTH')
const transactionRouter = require('./transactionRouter')
const userRouter = require('./userRouter-OPEN')
const userRouter_AUTH = require('./userRouter-AUTH')

// add param handlers to the router... doesn't seem to work here
// require('./paramHelpers')(router)

// TODO: reorganize routes for more consistency, i.e. pick a convention.
//  As of now it's unclear which router should have a route like `/api/posts/:postId/comments`.
//  Should it be the first entity or last?

router.use(categoryRouter)
router.use(postRouter)
router.use(commentRouter)
router.use(userRouter)

router.use(authCheck) // Auth Routes go after Open routes and auth middleware

router.use(transactionRouter)
router.use(categoryRouter_AUTH)
router.use(postRouter_AUTH)
router.use(commentRouter_AUTH)
router.use(userRouter_AUTH)

module.exports = router;