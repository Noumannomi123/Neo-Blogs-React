import express from "express";
const router = express.Router();
import multer from "multer";
import { db } from "../index.js";
import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the directory where the file will be uploaded
    },
    filename: function (req, file, cb) {
        // Extract the original file extension
        const ext = path.extname(file.originalname);
        // Create a new filename with a timestamp and the original extension
        cb(null, Date.now() + ext);
    }
});
const upload = multer({
    storage: storage,
})

router.get("/:id/all", async (req, res) => {
    try {
        const author_id = req.params.id;
        const result = await db.query("SELECT id,title,title_picture,created_at FROM blog_posts WHERE author_id = $1", [author_id]);
        // TO-DO: Send the image file. Read docs.
        // const data = result.rows.map((blog) => blog.title_picture = '');
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error fetching blogs from the database.", error)
        res.status(500).json({ message: "Error fetching blogs." })
    }
})
router.post("/new/:id", async (req, res) => {
    try {
        const author_id = req.params.id;
        const title = req.body.title;
        const title_picture = req.body.title_image;
        const content = req.body.content;
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