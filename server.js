const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require('./secret/firebase-secret.json');

const PORT = process.env.PORT || 3001;

const db = require('./models')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-auth-demo-24abd.firebaseio.com'
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bittokaDB');

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Add routes

app.post('/api/secret', (req, res) => {
  admin.auth().verifyIdToken(req.body.idToken)
    .then(decodedToken => {
      console.log(decodedToken)
      res.json(decodedToken)
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
})

app.get('/api/users/uid/:uid', (req, res) => {
  db.User.findOne({uid: req.params.uid}).then(dbUser => {
    res.json(dbUser)
  })
})

app.post('/api/users', (req, res) => {
  const { username, email, uid } = req.body
  const userData = {
    username: username,
    email: email,
    uid: uid,
    permissions: ['user']
  }
  db.User.create(userData).then(result => {
    res.json(result)
  })
})

app.use(routes);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
