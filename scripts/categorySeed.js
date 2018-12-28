const mongoose = require('mongoose');
const db = require('../models');
const group = require('../constants/permissionGroups')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bittokaDB');

const categoryData = [
  {
    // This category should have a limitation of 1 post per user account
    name: 'bitcoin-story',
    group: 'bitcoin-stories',
    displayName: 'Bitcoin Stories',
    description: `In this category, you receive Bitcoin for sharing your Bitcoin Story. 
    We encourage you to share your actual experiences, but if you’d like to pretend you are Satoshi 
    for the day, by all means go for it. Fact, fiction, or a mix of both works just fine here. 
    The choice is yours!`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['True Story', 'Entertainment', 'Future Thoughts', 'Personal Thoughts']
  },
  {
    name: 'stories',
    group: 'stories',
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
    tags: ['Drama', 'Personal', 'Fiction', 'Action/Adventure', 'Comedy', 'Fantasy', 'Mystery',
      'Thriller', 'Supernatural', 'Inspirational', 'Nonfiction', 'Satire']
  },
  {
    name: 'listoka',
    group: 'listoka',
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
  },
  {
    name: 'how-to',
    group: 'teach-learn',
    displayName: `How To..`,
    description: `How To Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'tricks-of-the-trade',
    group: 'teach-learn',
    displayName: 'Tricks of the Trade',
    description: `Tricks of the Trade Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['Life', 'Sleep', 'Entrepreneurship', 'Leadership', 'Financial Management', 'Business',
      'Legal', 'Accounting', 'Marketing', 'Customer Service', 'Human Relations',
      'Automotive', 'Home Ownership', 'Programming', 'Graphic Design', 'UI/UX', 'Writing', 
      'Web Development', 'Art', 'Human Relations']
  },
  {
    name: 'coding',
    group: 'teach-learn',
    displayName: 'Coding',
    description: `Coding Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['React', 'Javascript', 'MongoDB', 'MoneyButton','Tailwind','Draft-js']
  },
  {
    name: 'fitness',
    group: 'teach-learn',
    displayName: 'Fitness',
    description: `Fitness Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['Weight-Lifting','Exercises','Workouts','Goal-setting']
  },
  {
    name: 'health',
    group: 'teach-learn',
    displayName: 'Health',
    description: `Health Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['Health','Nutrition']
  },
  {
    name: 'natural-cooking',
    group: 'teach-learn',
    displayName: 'Natural Cooking',
    description: `Natural Cooking Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['Recipes','Advice']
  },
  {
    name: 'home-repair',
    group: 'teach-learn',
    displayName: 'Home Repair',
    description: `Home Repair Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['Electrical','Appliances','Plumbing','Painting','Windows','HVAC','Repair','Replacement']
  },
  {
    name: 'automotive',
    group: 'teach-learn',
    displayName: 'Automotive',
    description: `Automotive Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['Repair','Replacement']
  },
  {
    name: 'comedy',
    group: 'writers-workshop',
    displayName: 'Comedy',
    description: `Comedy Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []//Don't think we'll need any tags
  },
  {
    name: 'punchline-comedy',
    group: 'writers-workshop',
    displayName: 'Punchline Comedy',
    description: `Punchline Comedy Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []//Don't think we'll need any tags
  },
  {
    name: 'hypotheticals',
    group: 'writers-workshop',
    displayName: 'Hypotheticals',
    description: `Hypotheticals Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'letters',
    group: 'writers-workshop',
    displayName: 'Letters',
    description: `Letters Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['Love','Appreciation','Praise','Critique','Business','Wronged',
    'Individuals','Historical Figures','Well-known']
  },
  {
    name: 'poems',
    group: 'writers-workshop',
    displayName: 'Poems',
    description: `Poems Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'bonus-scene',
    group: 'writers-workshop',
    displayName: 'Bonus Scene',
    description: `Bonus Scene Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'writers-block',
    group: 'writers-workshop',
    displayName: `Writer's Block`,
    description: `Writer's Block Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'lists',
    group: 'wisdom',
    displayName: `Lists`,
    description: `Lists Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'interviews',
    group: 'wisdom',
    displayName: `Interviews`,
    description: `Interviews Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'ask-me-anything',
    group: 'wisdom',
    displayName: `AMA`,
    description: `AMA Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'question-and-answer',
    group: 'wisdom',
    displayName: `Q & A`,
    description: `Q & A Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'reviews',
    group: 'wisdom',
    displayName: `Reviews`,
    description: `Reviews Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: ['Business','Consumer Product','Book','Movie','Television','Restaurant','Game','Music']
  },
  {
    name: 'speeches',
    group: 'wisdom',
    displayName: `Speeches`,
    description: `Speeches Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'works-of-art',
    group: 'artistic-talent',
    displayName: `Works of Art`,
    description: `Works of Art Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'doodles',
    group: 'artistic-talent',
    displayName: `Doodles`,
    description: `Doodles Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'natures-beauty',
    group: 'artistic-talent',
    displayName: `Nature's Beauties`,
    description: `Nature's Beauties Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'tattoos',
    group: 'artistic-talent',
    displayName: `Tattoos`,
    description: `Tattoos Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'graphic-design',
    group: 'artistic-talent',
    displayName: `Graphic Design`,
    description: `Graphic Design Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  {
    name: 'food-art',
    group: 'artistic-talent',
    displayName: `Food Art`,
    description: `Food Art Description`,
    settings: {
      allowedPosters: [group.USER, group.ADMIN],
      defaultContentPrice: 0,
      posterSetsContentPrice: true,
      costToComment: 0,
      costToPost: 0
    },
    tags: []
  },
  

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