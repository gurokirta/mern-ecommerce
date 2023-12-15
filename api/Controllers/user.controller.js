import User from "../Models/User.model.js";
import { errorHandler } from "../Utils/error.js";
import bcryptjs from "bcryptjs";

export const update = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account"));
  }
  try {
    const user = await User.findById(req.params.id);
    if (req.body.oldPassword) {
      const currentPassword = req.body.oldPassword;
      const checkPasswords = bcryptjs.compareSync(currentPassword, user.password);
      if (checkPasswords) {
        user.password = currentPassword;
      }
      const updatedPassword = bcryptjs.hashSync(user.password);

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.firstName,
            secondName: req.body.secondName,
            displayName: req.body.displayName,
            profilePicture: req.body.profilePicture,
            password: updatedPassword,
          },
        },
        { new: true }
      );
      const { password, ...restInfo } = updatedUser._doc;
      res.status(200).json(restInfo);
    }
  } catch (error) {
    next(error);
  }
};
