import express from "express";
import Recipe from "../models/Recipe";
import { isAuthenticated } from "../middlwares/isAuthenticated";

const recipesRouter = express.Router();

recipesRouter.post("/", isAuthenticated, async (req, res) => {
  const { title, ingredients, instructions, estimatedTime, image } = req.body;

  try {
    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      estimatedTime,
      image,
      // @ts-ignore
      author: req._id,
    });

    await recipe.save();
    res.status(200).send("Recipe created");
  } catch (error) {
    res.status(500).send(error);
  }
});

recipesRouter.get("/", async (_req, res) => {
  const recipes = await Recipe.find().populate("author", "username");
  res.status(200).send(recipes);
});

recipesRouter.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate(
    "author",
    "username"
  );
  res.status(200).send(recipe);
});

recipesRouter.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
    });
    if (!recipe) {
      res.status(404).send("Recipe not found");
      return;
    }
    res.status(200).send("Recipe deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

recipesRouter.patch("/:id", isAuthenticated, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "ingredients",
    "instructions",
    "estimatedTime",
    "image",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid updates" });
    return;
  }

  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
    });

    recipe.title = req.body.title;
    recipe.ingredients = req.body.ingredients;
    recipe.instructions = req.body.instructions;
    recipe.estimatedTime = req.body.estimatedTime;
    //@ts-ignore
    recipe.image = req.body.image;

    if (!recipe) {
      res.status(404).send("Recipe not found");
      return;
    }

    await recipe.save();
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default recipesRouter;
