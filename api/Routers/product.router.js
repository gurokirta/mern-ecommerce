import express from "express";
import {
  create,
  getProduct,
  getProducts,
} from "../Controllers/product.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/products", getProducts);
router.get("/:id", getProduct);

export default router;
