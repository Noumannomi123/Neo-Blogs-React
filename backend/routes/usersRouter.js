import express from "express";
import bcrypt from "bcrypt";
import { db } from "../index.js";
const saltRounds = 10;
const router = express.Router();
import env from "dotenv";
env.config();


router.get("/profile/pic/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query("SELECT pic FROM user_profile WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User Profile Not Found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error fetching user profile from the database.", error);
        res.status(500).json({ message: "Error fetching user profile." });
    }
})
router.put("/profile/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { phone, gender, date_of_birth, address, facebook_link, twitter_link, instagram_link, pic } = req.body;
        const result = await db.query(
            "UPDATE user_profile SET phone = $1, gender = $2, date_of_birth = $3, address = $4, facebook_link = $5, twitter_link = $6, instagram_link = $7, pic = $8 WHERE id = $9 RETURNING *",
            [phone, gender, date_of_birth, address, facebook_link, twitter_link, instagram_link, pic, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User Profile Not Found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error updating user profile in the database.", error);
        res.status(500).json({ message: "Error updating user profile." });
    }
});

router.get("/profile/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query(
            "SELECT id, email, username as name, phone, gender, date_of_birth, address, facebook_link, twitter_link, instagram_link,pic FROM user_profile WHERE id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User Profile Not Found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error fetching user profile from the database.", error);
        res.status(500).json({ message: "Error fetching user profile." });
    }
});


router.get("/all", (req, res) => {
    res.send("All Users");
});

router.put("/update/:id", (req, res) => {
    res.send("Update a user");
});

router.delete("/delete/:id", (req, res) => {
    res.send("Delete a user");
});


export default router;