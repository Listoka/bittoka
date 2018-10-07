const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bittokaDB");

const categoryData = [
  {
  name: 'bitcoin-story',
  displayName: 'Bitcoin Story',
  description: `It's all about stories and bitcoins and stories about bitcoins.`,
  settings: {
    allowedPosters: ['user', 'admin'],
    defaultContentPrice: 0,
    posterSetsContentPrice: true,
    costToComment: 0,
    costToPost: 0
  }
},
{
  name: 'stories',
  displayName: 'Story',
  description: `It's all about the stories.`,
  settings: {
    allowedPosters: ['user', 'admin'],
    defaultContentPrice: 0,
    posterSetsContentPrice: true,
    costToComment: 0,
    costToPost: 0
  }
},
{
  name: 'listoka',
  displayName: 'Listoka',
  description: `It's all about listoka.`,
  settings: {
    allowedPosters: ['user', 'admin'],
    defaultContentPrice: 0,
    posterSetsContentPrice: true,
    costToComment: 0,
    costToPost: 0
  }
}
]

db.Category.deleteMany()
  .then(() => db.Category.create(categoryData))
  .then(dbCategory => {
    console.log('>>>> Category: ', dbCategory)
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })