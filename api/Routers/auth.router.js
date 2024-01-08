import express from "express";
import {
  signin,
  signup,
  google,
  signout,
  signUpAdmin,
} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/google", google);
router.post("/signup-admin", signUpAdmin);
router.get("/signout", signout);

export default router;
