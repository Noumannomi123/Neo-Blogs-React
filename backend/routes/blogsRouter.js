import express from "express";
const router = express.Router();

import { addNewComment, addReply, getAllComments, getAllReplies, getCommentCount, getSingleComment } from "../controllers/commentController.js";
import { addNewBlog, deleteBlog, getAllBlogs, getAuthorBlogs, getLikes, getSingleBlog, updateBlog } from "../controllers/blogController.js";

// blogs
router.get("/all", getAllBlogs);
router.get("/:id/all", getAuthorBlogs);
router.get("/:id", getSingleBlog);
router.post("/new/:id", addNewBlog);
router.put("/new/:id", updateBlog);
router.delete("/:id", deleteBlog);

// likes
router.get("/likes/:id", getLikes);

// comments
router.get("/comment/single/:id", getSingleComment);
router.get("/comment/count/:id", getCommentCount);
router.post("/comment/:id", addNewComment);
router.get("/comments/:id", getAllComments);

// replies
router.get("/replies/:comment_id/:post_id", getAllReplies);
router.post("/reply", addReply)


export default router;