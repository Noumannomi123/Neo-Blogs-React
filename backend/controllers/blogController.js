import { db } from "../index.js";
const getAllBlogs = async (req, res) => {
    try {
        const result = await db.query("SELECT id,summary, title, title_picture, created_at, author_name FROM blog_posts ORDER BY created_at DESC LIMIT 3");

        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error fetching blogs from the database.", error)
        res.status(500).json({ message: "Error fetching blogs." })
    }
}
const getAuthorBlogs = async (req, res) => {
    try {
        const author_id = req.params.id;
        const result = await db.query("SELECT id,title,title_picture,created_at FROM blog_posts WHERE author_id = $1", [author_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error fetching blogs from the database.", error)
        res.status(500).json({ message: "Error fetching blogs." })
    }
}

const getSingleBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query("SELECT b.summary, b.content,b.id,b.title,b.title_picture,b.created_at,b.author_name, u.pic FROM blog_posts b INNER JOIN user_profile u ON b.author_id = u.id WHERE b.id = $1", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error fetching blog from the database.", error)
        res.status(500).json({ message: "Error fetching blog." })
    }
}
const addNewBlog = async (req, res) => {
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

};

const updateBlog = async (req, res) => {
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

}
const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        await db.query("DELETE FROM blog_posts WHERE id = $1", [id]);
        console.log("Blog deleted successfully.");
        res.status(200).json({ message: "Blog deleted successfully." });
    } catch (error) {
        console.log("Error deleting blog from the database.", error)
        res.status(500).json({ message: "Error deleting blog." })
    }
}

const getLikes = async (req, res) => {
    try {
        const blog_id = req.params.id;
        const result = await db.query("SELECT count(*) FROM likes WHERE post_id = $1", [blog_id]);
        res.status(200).send(result.rows[0].count);
    } catch (error) {
        console.log("Error fetching likes from the database.", error)
        res.status(500).json({ message: "Error fetching likes." })
    }
}
export { getAllBlogs, getSingleBlog, getAuthorBlogs, addNewBlog, updateBlog, deleteBlog, getLikes }