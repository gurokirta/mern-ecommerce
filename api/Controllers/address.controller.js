import Address from "../Models/Address.model.js";
import { errorHandler } from "../Utils/error.js";

export const createAddress = async (req, res, next) => {
  //   const { name, phoneNumber, address } = req.body;

  try {
    const billingAddress = await Address.create(req.body);
    res.status(200).json(billingAddress);
  } catch (error) {
    next(error);
  }
};
