import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../middlwares/isAuthenticated";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(200).send("User created");
  } catch (error) {
    res.status(500).send(error);
  }
});

authRouter.get("/me", isAuthenticated, async (req, res) => {
  try {
    // @ts-ignore
    const user = await User.findById(req._id);

    if (user) {
      res.status(200).send(user);
      return;
    }

    res.status(400).send("User not found");
  } catch (error) {
    res.status(500).send(error);
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // @ts-ignore
    req.user = user;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default authRouter;
