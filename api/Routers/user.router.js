import express from "express";
import { update } from "../Controllers/user.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyToken, update);

export default router;
