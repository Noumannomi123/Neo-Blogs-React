import { Signup, Login } from "../controllers/authController.js";
import express from "express";
import { userVerification } from "../middleWares/authMiddleware.js";
const router = express.Router();

router.post("/", userVerification);
router.post("/signup", Signup);
router.post("/login", Login);
export default router;