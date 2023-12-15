import User from "../Models/User.model.js";
import { errorHandler } from "../Utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const validUser = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...restInfo } = validUser._doc;

    res.cookie("access_token", token, { httpOnly: true }).json(restInfo);
  } catch (error) {
    next(error);
  }
};
