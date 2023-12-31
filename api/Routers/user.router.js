import express from "express";
import { update, getAddress } from "../Controllers/user.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyToken, update);
router.get("/getaddress/:id", verifyToken, getAddress);

export default router;
