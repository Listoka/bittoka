const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bittokaDB");

const postData = [
    {
        title: "The Cyprus Beginning",
        author: "kels0la",
        categoryName: 'bitcoin-story',
        teaser: "teaser",
        body:
            "Bitcoin has the potential to become the best and fairest form of money to ever exist. It essentially rolls gold, cash, and our credit card system into one. It takes the strengths of each and leaves the weaknesses behind. It has the limited supply quality of gold, but can be used to purchase everyday items. It has the speed of a credit card, but respects and protects your privacy. Transactions are settled instantly like cash, but are recorded on a public ledger.",
    },
    {
        title: "My Bitcoin Story",
        author: "Chris Christian",
        categoryName: 'bitcoin-story',
        teaser: "teaser",
        body:
            "Some guy named from class won't shut up about it. He told me he'd give me $.25 to sign up on his platform so I thought, why not?",
    },
    {
        title: "How I got involved with Bitcoin",
        author: "Nicrob Andrewtim",
        categoryName: 'bitcoin-story',
        teaser: "teaser",
        body:
            "A classmate asked me to join the group to build the platform",
    },
    {
        title: "3 Main Apsects of Life",
        categoryName: "listoka",
        teaser: "teaser",
        body: "Stay healthy forever. Be financially comfortable. Enjoy life. To me, these are the three overall aspects to life. They're listed in no particular order, but if you were to order them, how would you do it and why?",
    },
    {
        title: "Best Advice",
        categoryName: "listoka",
        teaser: "teaser",
        body: "Great advice can be tough to come by. What's the best advice you've ever received and who was it from? Go."
    },
    {
        title: "Admiration",
        categoryName: "listoka",
        teaser: "teaser",
        body: "We all have people we look up to. People we admire for one reason or another. Share with us the person you most admire and why you admire them."
    },
    {
        title: "The Haunted Mansion",
        categoryName: "stories",
        teaser: "teaser",
        body: "Insert a story about a haunted mansion here."
    },
    {
        title: "A Super Funny Story",
        categoryName: "stories",
        teaser: "teaser",
        body: "Insert a comical story here"
    },
    {
        title: "How I Overcame the Odds",
        categoryName: "stories",
        teaser: "teaser",
        body: "Insert Inspirational Story Here"
    },

];

db.Post.deleteMany()
    .then(() => {
        return db.User.find()
    })
    .then(dbUser => {
        let data = postData.map(x => {
            let idx = Math.floor(dbUser.length * Math.random())
            console.log('>>>>>>>>>>> idx: ', idx)
            let author = dbUser[idx]
            x.author = author._id
            x.authorName = author.username
            return x
        })
        return db.Post.insertMany(data)
    })
    .then(dbPost => {
        console.log('>>>>> Added Posts:', dbPost)
        process.exit(0)
    })
    .catch(err => {
        console.log(err)
        process.exit(1)
    })