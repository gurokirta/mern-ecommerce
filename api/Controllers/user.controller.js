import User from "../Models/User.model.js";
import { errorHandler } from "../Utils/error.js";
import bcryptjs from "bcryptjs";

export const update = async (req, res, next) => {
  const { firstName, secondName, email, profilePicture, oldPassword, newPassword } =
    req.body;
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account"));
  }

  try {
    const user = await User.findById(req.params.id);

    const validatePassword = bcryptjs.compareSync(oldPassword, user.password);
    if (!validatePassword)
      return next(errorHandler(401, "Please enter your currently password"));

    const updatedPassword = bcryptjs.hashSync(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: firstName,
          secondName,
          displayName,
          profilePicture,
          email,
          password: updatedPassword,
        },
      },
      { new: true }
    );
    const { password: pass, ...restInfo } = updatedUser._doc;

    res.status(200).json(updatedUser._doc);
  } catch (error) {
    next(error);
  }
};
