const express = require("express");
const { check, validationResult } = require("express-validator");
const Recipe = require("../models/recipe");
const User = require("../models/user");
const auth = require("../auth");
const router = express.Router();

router.get("/all-recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});

router.get("/recipe/:id", async (req, res) => {
  try {
    const recipes = await Recipe.findById(req.params.id);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});
router.post(
  "/add-recipe",
  [
    auth,
    [
      check("name", "Recipe name required")
        .not()
        .isEmpty(),
      check("procedure", "Tell us how you made this recipe")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(402).json({ errors: error.array() });
    }

    try {
      const recipe = await new Recipe(req.body);
      const chef = await User.findById(req.user.id);
      recipe.user = req.user.id;
      recipe.chef = chef.name;
      await recipe.save();
      res.json("Recipe added").status(200);
    } catch (error) {
      res.status(500).json({ errors: error.message });
    }
  }
);

// get logged in users recipes
router.get("/recipes/me", auth, async (req, res) => {
  try {
    const recipes = await Recipe.findById(req.user.id);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ errors: "server error" });
  }
});

// delete recipe
router.delete("/recipe/:id", auth, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (recipe.user.toString() != req.user.id) {
    return res
      .status(401)
      .json("Not authorized to delete other user's recipe/s");
  }
  if (recipe) {
    await Recipe.findByIdAndDelete(req.params.id);
    res.send("Recipe Deleted");
  } else {
    res.send("Unable to delete the recipe");
  }
});
module.exports = router;
