import User from "../Models/User.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { name, username, password, email } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ name, username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(200).json("Sign up completed successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
