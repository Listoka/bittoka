const mongoose = require("mongoose");
const db = require("../models");
const fakePostGen = require('./mock-post-html')
const { randomDate, fakeVoters } = require('./helpers')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bittokaDB');

const postData = [
  {
    title: "The Cyprus Beginning",
    tags: ["About You", "Your Experience", "Your Future Vision"],
    categoryName: 'bitcoin-story',
    teaser: "teaser",
    paywallCost: .05,
    body:
      "Bitcoin has the potential to become the best and fairest form of money to ever exist. It essentially rolls gold, cash, and our credit card system into one. It takes the strengths of each and leaves the weaknesses behind. It has the limited supply quality of gold, but can be used to purchase everyday items. It has the speed of a credit card, but respects and protects your privacy. Transactions are settled instantly like cash, but are recorded on a public ledger.",
  },
  {
    title: "My Bitcoin Story",
    tags: ["Other Thoughts", "Your Experience", "Your Future Vision"],
    categoryName: 'bitcoin-story',
    teaser: "teased",
    paywallCost: .02,
    body:
      "Some guy named from class won't shut up about it. He told me he'd give me $.25 to sign up on his platform so I thought, why not?",
  },
  {
    title: "How I got involved with Bitcoin",
    tags: ["Other Thoughts", "Your Future Vision"],
    categoryName: 'bitcoin-story',
    teaser: "Gonna cost you",
    paywallCost: .03,
    body:
      "A classmate asked me to join the group to build the platform",
  },
  {
    title: "3 Main Apsects of Life",
    categoryName: "listoka",
    tags: ['Health', 'Financial', 'Enjoy Life', 'Bitcoin'],
    teaser: "Only if you pay $.04",
    paywallCost: .04,
    body: "Stay healthy forever. Be financially comfortable. Enjoy life. To me, these are the three overall aspects to life. They're listed in no particular order, but if you were to order them, how would you do it and why?",
  },
  {
    title: "Best Advice",
    categoryName: "listoka",
    tags: ["Wisdom", "Self-Reflection"],
    teaser: "Must use paywall!",
    paywallCost: .02,
    body: "Great advice can be tough to come by. What's the best advice you've ever received and who was it from? Go."
  },
  {
    title: "Admiration",
    categoryName: "listoka",
    tags: ["Health", 'Enjoy Life', 'Bitcoin',],
    teaser: "It'll cost ya! A whoppin $.02",
    paywallCost: .02,
    body: "We all have people we look up to. People we admire for one reason or another. Share with us the person you most admire and why you admire them."
  },
  {
    title: "The Haunted Mansion",
    categoryName: "stories",
    tags: ['Story Prompts', 'Thriller', 'Inspirational'],
    teaser: "HAUNTED MANSIONS. What could be better...",
    body: "Insert a story about a haunted mansion here."
  },
  {
    title: "A Super Funny Story",
    categoryName: "stories",
    tags: ["Humor", "Paranormal Romance"],
    teaser: "Oh this one is a real knee-slappin' paranormal romance",
    paywallCost: .04,
    body: "Insert a comical story here"
  },
  {
    title: "How I Overcame the Odds",
    categoryName: "stories",
    tags: ["Thriller", 'Your Story', 'Drama'],
    teaser: "I went to great lengths to overcome these odds. It was a long, hard journey.",
    paywallCost: .03,
    body: "Insert Inspirational Story Here"
  },
  {
    title: "This is a Work in Progress",
    categoryName: "stories",
    tags: ["Fantasy", 'Fiction', 'Your Story'],
    teaser: "WIP Teaser",
    body: "Much work in progress.  Such wow.",
    isDraft: true
  },
  {
    title: "What is your favorite Bitcoin app and why?",
    categoryName: "listoka",
    tags: ['Favorites', 'Writings', 'Self-Reflection'],
    teaser: "Hope you can afford the $.04 price to pay!",
    paywallCost: .04,
    body: "Psyche! Nothing's here!",
  },
  {
    title: "My Bitcoin Story began in 2013 and it's been my passion ever since?",
    categoryName: "bitcoin-story",
    tags: ["Your Experience", "Your Future Vision"],
    teaser: "BITCOIN STORY INCOMING!",
    body: "Just kidding! Nothing's here!",
  },

];

function seedPosts() {
  return db.Post.deleteMany()
    .then(() => {
      return db.User.find()
    })
    .then(dbUser => {
      let data = postData.map(x => {
        let idx = Math.floor(dbUser.length * Math.random())
        let author = dbUser[idx]
        x.author = author._id
        x.voters = fakeVoters(300, author._id)
        x.authorName = author.username
        return x
      })
      return db.Post.insertMany(data)
    })
  // .then(dbPost => {
  //   console.log('\n>>>>> Added Posts:\n', dbPost)
  //   process.exit(0)
  // })
  // .catch(err => {
  //   console.log(err)
  //   process.exit(1)
  // })
}

async function bigPostSeed() {
  await seedPosts()
  const categories = await db.Category.find()
  const users = await db.User.find()

  const postData = []
  for (let category of categories) {
    for (let i = 0; i < 100; i++) {
      const author = users[Math.floor(Math.random() * users.length)]
      const numTags = Math.floor(Math.random() * category.tags.length)
      const cost = Math.random() * 0.10
      const data = {
        title: fakePostGen.getTitleString(),
        body: fakePostGen.createPostHtml(3, 30),
        teaser: fakePostGen.getTeaser(),
        tags: pickTags(category.tags, numTags),
        author: author._id,
        authorName: author.username,
        categoryName: category.name,
        paywallCost: cost.toFixed(2),
        voters: fakeVoters(300, author._id),
        createdAt: randomDate(),
      }
      postData.push(data)
    }
  }

  return db.Post.insertMany(postData)
    .then(() => console.log('\n >>>>> Added a bunch of posts...'))
    .catch(err => console.log('\n >> seeding posts err: ', err))
}

function pickTags(tags, numTags) {
  let selectedTags = []
  while (selectedTags.length < numTags) {
    let t = tags[Math.floor(Math.random() * tags.length)]

    if (selectedTags.includes(t)) continue

    selectedTags.push(t)
  }

  return selectedTags
}

bigPostSeed().then(() => process.exit(0))
  .catch(err => {
    console.log('bigPostSeed ERR: ', err)
    process.exit(1)
  })