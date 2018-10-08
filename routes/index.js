const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');
const authMiddleware = require('../middleware/firebaseAuthMiddleware')

// API Routes
router.use('/api', authMiddleware)
router.use('/api', apiRoutes);

let indexPath = '../client/public/index.html'

if (process.env.NODE_ENV === 'production') {
  indexPath = '../client/build/index.html'
}

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, indexPath));
});

module.exports = router;