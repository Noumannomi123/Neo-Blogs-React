import { db } from "../index.js";
import { reduceImageSize } from "../utils/imageCompressor.js"
const getSingleComment = async (req, res) => {
    try {
        const comment_id = req.params.id;
        const result = await db.query(
            `SELECT c.id, u.username, u.pic, c.content, c.created_at
             FROM user_profile u
             INNER JOIN comments c ON u.id = c.user_id
             WHERE parent_id IS NULL AND post_id = $1 ORDER BY created_at DESC 
             LIMIT 1`,
            [comment_id]
        );
        for (let comment of result.rows) {
            if (comment.pic) {
                const sizeX = 50, sizeY = 50;
                const compressedImage = await reduceImageSize(comment.pic.split(',')[1], sizeX, sizeY, 25);
                comment.pic = `data:image/jpeg;base64,${compressedImage}`;
            }
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error fetching comment from the database.", error)
        res.status(500).json({ message: "Error fetching comment." })
    }
}

const getCommentCount = async (req, res) => {
    try {
        const post_id = req.params.id;
        const result = await db.query("SELECT COUNT(*) as count FROM comments WHERE post_id = $1 AND parent_id IS NULL", [post_id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error fetching comment count from the database.", error)
        res.status(500).json({ message: "Error fetching comment count." })
    }
}

const addNewComment = async (req, res) => {
    try {
        const post_id = req.params.id;
        const user_id = req.body.user_id;
        const content = req.body.content;
        const result = await db.query("INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING id", [post_id, user_id, content]);
        const commentResult = await db.query(
            `SELECT c.id, u.username, u.pic, c.content, c.created_at 
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
}
const getAllComments = async (req, res) => {
    try {
        const post_id = req.params.id;
        const response = await db.query(`SELECT u.username, u.pic,c.id, c.content, c.created_at from user_profile u inner join comments c on u.id = c.user_id where parent_id IS NULL AND c.post_id = $1   order by c.created_at desc LIMIT 2`, [post_id])
        // to-DO: fix this
        for (let comment of response.rows) {
            if (comment.pic) {
                const sizeX = 50, sizeY = 50;
                const q = 25;
                const originalImage = comment.pic.split(',')[1];
                const compressedImage = await reduceImageSize(originalImage, sizeX, sizeY, q)
                comment.pic = `data:image/jpeg;base64,${compressedImage}`
            }
        }
        res.status(200).json(response.rows);
    } catch (error) {
        console.log("Error fetching comments from the database.", error.message)
        res.status(500).json({ message: "Error fetching comments." })
    }
}
const addReply = async (req, res) => {
    try {
        const parent_id = req.body.comment_id;
        const user_id = req.body.user_id;
        const content = req.body.content;
        const post_id = req.body.post_id;
        const result = await db.query("INSERT INTO comments (parent_id, post_id, user_id, content) VALUES ($1, $2, $3, $4) RETURNING id", [parent_id, post_id, user_id, content]);
        const id = result.rows[0].id;
        const replyResult = await db.query(
            `SELECT c.id, u.username, u.pic, c.content, c.created_at
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
}
const getAllReplies = async (req, res) => {
    try {
        const parent_id = parseInt(req.params.comment_id);
        const post_id = req.params.post_id;
        const result = await db.query("SELECT r.parent_id, r.id, u.username, u.pic, r.content, r.created_at FROM user_profile u INNER JOIN comments r ON u.id = r.user_id WHERE r.parent_id = $1 and post_id = $2 ORDER BY r.created_at DESC LIMIT 2", [parent_id, post_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error fetching replies from the database.", error)
        res.status(500).json({ message: "Error fetching replies." })
    }
}
export { getSingleComment, getCommentCount, addNewComment, getAllComments, addReply, getAllReplies }