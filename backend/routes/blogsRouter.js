import express from "express";
const router = express.Router();
import { db } from "../index.js";

router.post("/comment/:id", async (req,res)=>{
    try {
        const post_id = req.params.id;
        const user_id = req.body.user_id;
        const content = req.body.content;
        const result = await db.query("INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3)", [post_id, user_id, content]);
        res.status(200).json(result);
    } catch (error) {
        console.log("Error adding comment to the database.", error)
        res.status(500).json({ message: "Error adding comment." })
    }
})

router.get("/comments/:id", async (req, res) => {
    try {
        const post_id = req.params.id;
        const response = await db.query(`SELECT u.username, u.pic, c.content, c.created_at from user_profile u inner join comments c on u.id = c.user_id where c.post_id = $1 order by c.created_at desc`, [post_id])
        res.status(200).json(response.rows);
    } catch (error) {
        console.log("Error fetching comments from the database.")
        res.status(500).json({ message: "Error fetching comments." })
    }
})

// get number of likes
router.get("/likes/:id", async (req, res) => {
    try {
        const blog_id = req.params.id;
        const result = await db.query("SELECT count(*) FROM likes WHERE post_id = $1", [blog_id]);
        res.status(200).send(result.rows[0].count);
    } catch (error) {
        console.log("Error fetching likes from the database.", error)
        res.status(500).json({ message: "Error fetching likes." })
    }
})

router.get("/all", async (req, res) => {
    try {
        const result = await db.query("SELECT id,summary, title, title_picture, created_at, author_name FROM blog_posts ORDER BY created_at DESC");
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error fetching blogs from the database.", error)
        res.status(500).json({ message: "Error fetching blogs." })
    }
})

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
        const summary = req.body.summary;
        const author_name = req.body.author_name;
        console.log(author_name);
        await db.query("INSERT INTO blog_posts (author_id, title, title_picture, content, summary, author_name) VALUES ($1, $2, $3, $4, $5, $6)",
            [author_id, title, title_picture, content, summary, author_name]
        )
        console.log("Blog created successfully.");
        res.status(200).json({ message: "Blog created successfully." });
    } catch (error) {
        console.log("Error writing blog to the database.");
        res.status(500).json({ message: "Error creating blog." });
    }

})

router.put("/new/:id", async (req, res) => {
    try {
        const author_id = req.params.id;
        const postId = req.query.blog_id;
        const title = req.body.title;
        const title_picture = req.body.title_image;
        const content = req.body.content;
        const summary = req.body.summary;
        console.log(author_id, postId, title)
        await db.query(
            "UPDATE blog_posts SET author_id = $1, title = $2, title_picture = $3, content = $4, summary = $5 WHERE id = $6",
            [author_id, title, title_picture, content, summary, postId]
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
        const result = await db.query("SELECT summary, content,id,title,title_picture FROM blog_posts WHERE id = $1", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error fetching blog from the database.", error)
        res.status(500).json({ message: "Error fetching blog." })
    }
})
export default router;