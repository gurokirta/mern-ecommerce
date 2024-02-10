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

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return next(errorHandler(404, "Product does not exists"));

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
