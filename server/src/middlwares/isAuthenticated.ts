import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const splittedToken = token.split(" ")[1];

  if (splittedToken === "null") {
    return res.status(403).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(splittedToken, process.env.JWT_SECRET!);

    // @ts-ignore
    req._id = decoded._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};
