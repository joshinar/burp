const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  chef: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  handsOnTime: {
    type: String,
    required: true
  },
  totalTime: {
    type: String,
    required: true
  },
  yield: {
    type: String
  },
  ingredients: {
    type: String,
    required: true
  },
  procedure: {
    type: String
  },
  image: {
    type: String,
    default:
      "https://images.prod.meredith.com/product/b7a6e3ac9de90cc116fab9c0f820d9b8/1554330838288/l/blank-recipe-journal-recipe-books-to-write-in-recipe-organizer-blank-cookbook-recipe-notebook-homemade-recipe-book-blank-recipe-book-breakfast-recipes"
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
