import express from "express";
import authRouter from "./routes/auth";
import recipesRouter from "./routes/recipes";
import dotenv from "dotenv";
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

export const app = express();

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/recipes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err: any) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/recipes", recipesRouter);

app.get("/", (_req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
