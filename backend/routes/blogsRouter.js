import express from "express";
const router = express.Router();
import { db } from "../index.js";

router.get("/comment/single/:id", async (req, res) => {
    try {
        const comment_id = req.params.id;
        const result = await db.query(
            `SELECT u.username, u.pic, c.content, c.created_at
             FROM user_profile u
             INNER JOIN comments c ON u.id = c.user_id
             WHERE parent_id IS NULL AND post_id = $1 ORDER BY created_at DESC 
             LIMIT 1`,
            [comment_id]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error fetching comment from the database.", error)
        res.status(500).json({ message: "Error fetching comment." })
    }
})

router.get("/comment/count/:id", async (req, res) => {
    try {
        const post_id = req.params.id;
        const result = await db.query("SELECT COUNT(*) as count FROM comments WHERE post_id = $1 AND parent_id IS NULL", [post_id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error fetching comment count from the database.", error)
        res.status(500).json({ message: "Error fetching comment count." })
    }
})

router.post("/comment/:id", async (req, res) => {
    try {
        const post_id = req.params.id;
        const user_id = req.body.user_id;
        const content = req.body.content;
        const result = await db.query("INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING id", [post_id, user_id, content]);
        const commentResult = await db.query(
            `SELECT u.username, u.pic, c.content, c.created_at 
             FROM user_profile u 
             INNER JOIN comments c ON u.id = c.user_id 
             WHERE c.id = $1`,
            [result.rows[0].id]
        );
        res.status(200).json(commentResult.rows[0]);
    } catch (error) {
        console.log("Error adding comment to the database.", error)
        res.status(500).json({ message: "Error adding comment." })
    }
})

router.post("/reply", async (req, res) => {
    try {
        const parent_id = req.body.comment_id;
        const user_id = req.body.user_id;
        const content = req.body.content;
        const post_id = req.body.post_id;
        const result = await db.query("INSERT INTO comments (parent_id, post_id, user_id, content) VALUES ($1, $2, $3, $4) RETURNING id", [parent_id, post_id, user_id, content]);
        const id = result.rows[0].id;
        const replyResult = await db.query(
            `SELECT u.username, u.pic, c.content, c.created_at
             FROM user_profile u
             INNER JOIN comments c ON u.id = c.user_id
             WHERE c.id = $1`,
            [id]
        );
        res.status(200).json({ id: id, ...replyResult.rows[0] });
    } catch (error) {
        console.log("Error adding reply to the database.", error)
        res.status(500).json({ message: "Error adding reply." })
    }
})

router.get("/replies/:comment_id/:post_id", async (req, res) => {
    try {
        const parent_id = parseInt(req.params.comment_id);
        const post_id = req.params.post_id;
        const result = await db.query("SELECT r.parent_id, r.id, u.username, u.pic, r.content, r.created_at FROM user_profile u INNER JOIN comments r ON u.id = r.user_id WHERE r.parent_id = $1 and post_id = $2 ORDER BY r.created_at DESC", [parent_id, post_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error fetching replies from the database.", error)
        res.status(500).json({ message: "Error fetching replies." })
    }
})

router.get("/comments/:id", async (req, res) => {
    try {
        const post_id = req.params.id;
        const response = await db.query(`SELECT u.username, u.pic,c.id, c.content, c.created_at from user_profile u inner join comments c on u.id = c.user_id where parent_id IS NULL AND c.post_id = $1   order by c.created_at desc `, [post_id])
        res.status(200).json(response.rows);
    } catch (error) {
        console.log("Error fetching comments from the database.", error.message)
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
        const result = await db.query("SELECT b.summary, b.content,b.id,b.title,b.title_picture,b.created_at,b.author_name, u.pic FROM blog_posts b INNER JOIN user_profile u ON b.author_id = u.id WHERE b.id = $1", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error fetching blog from the database.", error)
        res.status(500).json({ message: "Error fetching blog." })
    }
})
export default router;