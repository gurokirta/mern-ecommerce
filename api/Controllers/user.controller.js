import User from "../Models/User.model.js";
import Address from "../Models/Address.model.js";
import { errorHandler } from "../Utils/error.js";
import bcryptjs from "bcryptjs";

export const update = async (req, res, next) => {
  const {
    firstName,
    secondName,
    email,
    profilePicture,
    oldPassword,
    newPassword,
    displayName,
  } = req.body;
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

    res.status(200).json(restInfo);
  } catch (error) {
    next(error);
  }
};

export const getAddress = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const billingAddresses = await Address.find({ userRef: req.params.id });

      res.status(200).json(billingAddresses);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can view only your billing addresses"));
  }
};
