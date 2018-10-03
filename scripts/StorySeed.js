const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bittokaDB");

const StorySeed = [
    {
        title: "The Haunted Mansion",
        author: "kels0la",
        text:
        "Insert a story about a haunted mansion here.",
        date: new Date(Date.now())
    },
    {
        title: "A super funny story",
        author: "Chris Christian",
        text:
        "Insert a comical story here",
        date: new Date(Date.now())
    },
    {
        title: "How I overcame the odds",
        author: "Nicrob Andrewtim",
        text:
        "Insert inspirational story here",
        date: new Date(Date.now())
    }
];

db.Story
    .remove({})
    .then( () => db.Story.collection.insertMany(StorySeed))
    .then(data => {
        console.log(data.result.n + " records inserted");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
});