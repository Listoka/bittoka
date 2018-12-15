const mongoose = require('mongoose');
const db = require('../models');
const group = require('../constants/permissionGroups')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bittokaDB');

const categoryData = [
  {
    name: 'bitcoin-story',
    displayName: 'Bitcoin Story',
    description: `My Bitcoin story began in 2013, but I want to hear about yours. 
  Share with us how you first got involved with Bitcoin, any other thoughts related to it, and where you see it going from here
  If you post your story here and share it with us over Twitter or Facebook, we will happily deposit $.25
  into your MoneyButton account to get you started on the platform. To financial freedom! Cheers! `,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['About You', 'Your Experience', 'Your Future Vision', 'Other Thoughts']
  },
  {
    name: 'stories',
    displayName: 'Stories',
    description: `Enjoy writing or have a good story to tell or both? If so, you're at the right place.
  Listoka's Story category allows aspiring authors post their stories here and make money in the process.
  The author provides a free 'teaser' that entices their audience to continue reading, and they get paid by 
  hiding content behind a paywall, with a price set by them. That's right, you don't need to be a well-known
  author to make money any longer. You can now earn it right here, right now, and without the hastle of publishing.
  The higher the quality the content, the more you're likely to earn. Use your paywall wisely.`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['Story Prompts', 'Your Story', 'Fiction', 'Drama', 'Comedy', 'Fantasy', 'Paranormal Romance', 'Thriller', 'Inspirational']
  },
  {
    name: 'listoka',
    displayName: 'Listoka',
    description: `Think of this as one big, ongoing list that intends to better the lives of those that view it. 
  The platform provides the writing parameters, and the users provide the answers. 
  The most upvoted and commented answers will rise to the top, and they can only be unseated when the community decides something else should overtake the throne.
  The game will go on forever and the orderings should change over time.
  $.05 to post, $.03 to upvote, $.03 to comment. Looking forward to your contributions!`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['Health', 'Financial', 'Enjoy Life', 'Wisdom', 'Business', 'Favorites', 'Writings', 'Self-Reflection', 'Bitcoin']
  }
]

function seedCategories() {
  return db.Category.deleteMany()
    .then(() => db.Category.create(categoryData))
    .then(dbCategory => {
      console.log('\n>>>>> Category:\n', dbCategory)
      process.exit(0)
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
}

seedCategories()