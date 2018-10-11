const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bittokaDB");

// these are real firbase logins
// the password is 123123 for all of them
const userData = [
  {
    username: 'sally',
    uid: 'XQayyvz0zkXKR1Fc1BeOXcFj7d02',
    email: 'sally@thing.com',
    permissions: ['user'],
    moneyBtnId: '783'
  },
  {
    username: 'Joe Schmoe',
    uid: '76uRmVJAuDUqqeLRhzEyyd2uc863',
    email: 'joe@thing.com',
    permissions: ['user']
  },
  {
    username: 'Bertrand',
    uid: '1aaIqR9kX5bAFXqR78T381MHLtf1',
    email: 'berty@thing.com',
    permissions: ['user']
  }
]

db.User.deleteMany()
  .then(() => {
    return db.User.insertMany(userData)
  })
  .then(dbUser => {
    console.log('\n>>>>> Users:\n', dbUser)
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
