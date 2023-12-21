import express from "express";
import { signin, signup, signout } from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.get("/signout", signout);

export default router;
