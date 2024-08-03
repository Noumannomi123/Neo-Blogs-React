import express from "express";
const router = express.Router();
import { db } from "../index.js";
router.get("/:id/all", async (req, res) => {
    try {
        const author_id = req.params.id;
        const result = await db.query("SELECT id,title,title_picture,created_at FROM blog_posts WHERE author_id = $1", [author_id]);
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

router.put("/new/:id", async (req, res) => {
    try {
        const author_id = req.params.id;
        const postId = req.query.blog_id;
        const title = req.body.title;
        const title_picture = req.body.title_image;
        const content = req.body.content;
        console.log(author_id, postId, title)
        await db.query(
            "UPDATE blog_posts SET author_id = $1, title = $2, title_picture = $3, content = $4 WHERE id = $5",
            [author_id, title, title_picture, content, postId]
        );
        console.log("Blog updated successfully.");
        res.status(200).json({ message: "Blog created successfully." });
    } catch (error) {
        console.log("Error writing blog to the database.", error)
        res.status(500).json({ message: "Error creating blog." })
    }

})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await db.query("DELETE FROM blog_posts WHERE id = $1", [id]);
        console.log("Blog deleted successfully.");
        res.status(200).json({ message: "Blog deleted successfully." });
    } catch (error) {
        console.log("Error deleting blog from the database.", error)
        res.status(500).json({ message: "Error deleting blog." })
    }
})


router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query("SELECT content,id,title,title_picture FROM blog_posts WHERE id = $1", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error fetching blog from the database.", error)
        res.status(500).json({ message: "Error fetching blog." })
    }
})
export default router;