import Signup from "../controllers/authController.js";
import { Login } from "../controllers/authController.js";
import express from "express";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
export default router;