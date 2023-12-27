import User from "../Models/User.model.js";
import { errorHandler } from "../Utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, username, password, email } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    name,
    username,
    email,
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

export const google = async (req, res, next) => {
  const { email, profilePicture, name, password, username } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...restInfo } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(restInfo);
    } else {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = new User({
        email,
        name,
        profilePicture,
        password: hashedPassword,
        username,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...restInfo } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(restInfo);
    }
  } catch (error) {
    next(errorHandler(500, error));
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Sign out successfully");
  } catch (error) {
    next(error);
  }
};
