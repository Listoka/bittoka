const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bittokaDB");

const ListokaSeed = [
    {
        title: "3 Main Aspects of Life",
        text:"Stay healthy forever. Be financially comfortable. Enjoy life. To me, these are the three overall aspects to life. They're listed in no particular order, but if you were to order them, how would you do it and why?",
        date: new Date(Date.now())
    },
    {
        title: "Best Advice",
        text: "Great advice can be tough to come by. What's the best advice you've ever received and who was it from? Go.",
        date: new Date(Date.now())
    },
    {
        title: "Admiration",
        text: "We all have people we look up to. People we admire for one reason or another. Share with us the person you most admire and why you admire them.",
        date: new Date(Date.now())
    }
];

db.Listoka
    .remove({})
    .then( () => db.Listoka.collection.insertMany(ListokaSeed))
    .then(data => {
        console.log(data.result.n + " records inserted");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
});