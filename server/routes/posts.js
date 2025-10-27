// posts.js - Post routes

const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
} = require("../controllers/postController");
const { protect } = require("../middleware/auth");
const { validatePost, validateComment } = require("../middleware/validation");
const upload = require("../middleware/upload");

// Search route must come before /:id route
router.get("/search", searchPosts);

router
  .route("/")
  .get(getPosts)
  .post(protect, upload.single("featuredImage"), validatePost, createPost);

router
  .route("/:id")
  .get(getPost)
  .put(protect, upload.single("featuredImage"), validatePost, updatePost)
  .delete(protect, deletePost);

router.post("/:id/comments", protect, validateComment, addComment);

module.exports = router;
