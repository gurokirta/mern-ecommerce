import Address from "../Models/Address.model.js";
import { errorHandler } from "../Utils/error.js";

export const createAddress = async (req, res, next) => {
  try {
    const billingAddress = await Address.create(req.body);
    res.status(200).json(billingAddress);
  } catch (error) {
    next(error);
  }
};

// export const getAddress = async (req, res, next) => {
//   try {
//     const billingAddress = await Address.findById(req.params.id);

//     if (!billingAddress)
//       return next(errorHandler(404, "Billing address does not exist"));

//     res.status(200).json(billingAddress);
//   } catch (error) {
//     next(error);
//   }
// };
