import mongoose from "mongoose";

interface IRecipe extends mongoose.Document {
  title: string;
  ingredients: string[];
  instructions: string;
  estimatedTime: number;
  images: string;
  author: mongoose.Schema.Types.ObjectId;
}

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  estimatedTime: { type: Number, required: false },
  image: { type: String, required: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
