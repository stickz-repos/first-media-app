const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Joke Schema
const jokeSchema = new Schema({
  user: { type: String , required: true},
  joke: { type: String, required: true, maxlength: 100 },
});

// Category Schema
const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  likes: { type: Number },
  jokes: [jokeSchema],
});

module.exports = mongoose.model("category", categorySchema);
module.exports = mongoose.model("joke", jokeSchema);
