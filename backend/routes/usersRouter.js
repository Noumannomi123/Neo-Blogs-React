import express from "express";
const router = express.Router();
import env from "dotenv";
import { getProfile, getProfilePic, updateProfile } from "../controllers/userController.js";
env.config();

router.get("/profile/:id", getProfile);
router.put("/profile/:id", updateProfile);
router.get("/profile/pic/:id", getProfilePic);

export default router;