const mongoose = require("mongoose");
const db = require("../models");
const group = require('../constants/permissionGroups')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bittokaDB");

// these are real firbase logins
// the password is 123123 for all of them
const userData = [
  {
    username: 'sally',
    uid: 'XQayyvz0zkXKR1Fc1BeOXcFj7d02',
    email: 'sally@thing.com',
    permissions: [group.USER],
    moneyBtnId: '588',
    bio: 'This is Sally\'s bio.'
  },
  {
    username: 'Joe Schmoe',
    uid: '76uRmVJAuDUqqeLRhzEyyd2uc863',
    email: 'joe@thing.com',
    bio: 'This is Joe\'s bio.',
    moneyBtnId: '588',
    permissions: [group.USER]
  },
  {
    username: 'Bertrand',
    uid: '1aaIqR9kX5bAFXqR78T381MHLtf1',
    email: 'berty@thing.com',
    moneyBtnId: '590',
    bio: 'This is Bertrand\'s bio.',
    permissions: [group.USER]
  }
]

function seedUsers() {
  return db.User.deleteMany()
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
}

seedUsers()