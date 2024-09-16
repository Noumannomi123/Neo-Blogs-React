import { Signup, Login } from "../controllers/authController.js";
import express from "express";
import { userVerification } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Hello from the server!" });
});
router.post("/", userVerification);
router.post("/signup", Signup);
router.post("/login", Login);
export default router;