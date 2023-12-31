import express from "express";
import { verifyToken } from "../Utils/verifyUser.js";
import { createAddress } from "../Controllers/address.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createAddress);
// router.get("/getAddress/:id", getAddress);

export default router;
