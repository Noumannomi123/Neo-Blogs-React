import express from "express";
const router = express.Router();
import multer from "multer";
import { db } from "../index.js";
const upload = multer({ dest: 'uploads/' })
router.post("/new/:id", upload.single('image'), async (req, res) => {
    try {
        const author_id = req.params.id;
        const title = req.body.title;
        const title_picture = req.file.filename;
        const content = req.body.content;
        console.log(author_id, title, title_picture, content)
        await db.query("INSERT INTO blog_posts (author_id, title, title_picture, content) VALUES ($1, $2, $3, $4)",
            [author_id, title, title_picture, content]
        )
        console.log("Blog created successfully.");
        res.status(200).json({ message: "Blog created successfully." });
    } catch (error) {
        console.log("Error writing blog to the database.", error)
        res.status(500).json({ message: "Error creating blog." })
    }

})

export default router;