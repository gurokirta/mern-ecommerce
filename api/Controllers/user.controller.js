import User from "../Models/User.model.js";
import { errorHandler } from "../Utils/errorHandler.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { name, username, password, email, profilePicture } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    name,
    username,
    email,
    profilePicture,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json("Sign up completed successfully");
  } catch (error) {
    next(errorHandler(500, "Sign up failed"));
  }
};
