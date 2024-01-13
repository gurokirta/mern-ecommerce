import Product from "../Models/Product.model.js";
import { errorHandler } from "../Utils/error.js";

export const create = async (req, res, next) => {
  const {
    title,
    description,
    measurements,
    price,
    discountedPrice,
    pictures,
    color,
    category,
    quantity,
    offer,
    userRef,
  } = req.body;

  const newProduct = new Product({
    title,
    description,
    measurements,
    price,
    discountedPrice,
    pictures,
    color,
    category,
    quantity,
    offer,
    userRef,
  });
  try {
    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (error) {
    next(errorHandler(500, "Failed to create product"));
  }
};
