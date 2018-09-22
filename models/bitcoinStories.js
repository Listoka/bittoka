const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bitcoinStorySchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }, // Will be based on login name in the future
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const BitcoinStory = mongoose.model("BitcoinStories", bitcoinStorySchema);

module.exports = BitcoinStory;
