const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }, // Will be based on login name in the future
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Story = mongoose.model("Stories", StorySchema);

module.exports = Story;
