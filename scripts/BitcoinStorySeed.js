const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bittokaDB");

const BitcoinStorySeed = [
    {
        title: "The Cyprus Beginning",
        author: "kels0la",
        categoryName: 'bitcoin-stories',
        teaser: "teaser",
        body:
            "Bitcoin has the potential to become the best and fairest form of money to ever exist. It essentially rolls gold, cash, and our credit card system into one. It takes the strengths of each and leaves the weaknesses behind. It has the limited supply quality of gold, but can be used to purchase everyday items. It has the speed of a credit card, but respects and protects your privacy. Transactions are settled instantly like cash, but are recorded on a public ledger.",
    },
    {
        title: "My Bitcoin Story",
        author: "Chris Christian",
        categoryName: 'bitcoin-stories',
        teaser: "teaser",
        body:
            "Some guy named from class won't shut up about it. He told me he'd give me $.25 to sign up on his platform so I thought, why not?",
    },
    {
        title: "How I got involved with Bitcoin",
        author: "Nicrob Andrewtim",
        categoryName: 'bitcoin-stories',
        teaser: "teaser",
        body:
            "A classmate asked me to join the group to build the platform",
    }
];

db.Post.deleteMany({categoryName: 'bitcoin-stories'})
    .then(() => {
        return db.User.find()
    })
    .then(dbUser => {
        let data = BitcoinStorySeed.map(x => {
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