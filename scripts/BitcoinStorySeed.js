const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bittokaDB");

const BitcoinStorySeed = [
    {
        title: "The Cyprus Beginning",
        author: "kels0la",
        text:
        "Bitcoin has the potential to become the best and fairest form of money to ever exist. It essentially rolls gold, cash, and our credit card system into one. It takes the strengths of each and leaves the weaknesses behind. It has the limited supply quality of gold, but can be used to purchase everyday items. It has the speed of a credit card, but respects and protects your privacy. Transactions are settled instantly like cash, but are recorded on a public ledger.",
        date: new Date(Date.now())
    },
    {
        title: "My Bitcoin Story",
        author: "Chris Christian",
        text:
        "Some guy named from class won't shut up about it. He told me he'd give me $.25 to sign up on his platform so I thought, why not?",
        date: new Date(Date.now())
    },
    {
        title: "How I got involved with Bitcoin",
        author: "Nicrob Andrewtim",
        text:
        "A classmate asked me to join the group to build the platform",
        date: new Date(Date.now())
    }
];

db.BitcoinStory
    .remove({})
    .then( () => db.BitcoinStory.collection.insertMany(BitcoinStorySeed))
    .then(data => {
        console.log(data.result.n + " records inserted");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
});