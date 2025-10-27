// postController.js - Post controller

const Post = require("../models/Post");

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.author) {
      query.author = req.query.author;
    }

    // Get posts with pagination
    const posts = await Post.find(query)
      .populate("author", "name email avatar")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Post.countDocuments(query);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPost = async (req, res, next) => {
  try {
    // Find by ID or slug
    const post = await Post.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
    })
      .populate("author", "name email avatar bio")
      .populate("category", "name slug")
      .populate("comments.user", "name avatar");

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    // Increment view count
    await post.incrementViewCount();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.author = req.user.id;

    // Handle featured image from file upload
    if (req.file) {
      req.body.featuredImage = req.file.filename;
    } else {
      // Remove featuredImage from body if it exists as empty value
      delete req.body.featuredImage;
    }

    // Handle tags array
    if (req.body["tags[]"]) {
      req.body.tags = Array.isArray(req.body["tags[]"])
        ? req.body["tags[]"]
        : [req.body["tags[]"]];
      delete req.body["tags[]"];
    }

    console.log("Creating post with data:", JSON.stringify(req.body, null, 2));

    const post = await Post.create(req.body);

    // Populate the post
    await post.populate("author", "name email avatar");
    await post.populate("category", "name slug");

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    // Provide more detailed error message
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }
    next(error);
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    // Make sure user is post owner or admin
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Not authorized to update this post",
      });
    }

    // Handle featured image from file upload
    if (req.file) {
      req.body.featuredImage = req.file.filename;
    } else {
      // Remove featuredImage from body if it exists as empty value
      delete req.body.featuredImage;
    }

    // Handle tags array
    if (req.body["tags[]"]) {
      req.body.tags = Array.isArray(req.body["tags[]"])
        ? req.body["tags[]"]
        : [req.body["tags[]"]];
      delete req.body["tags[]"];
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("author", "name email avatar")
      .populate("category", "name slug");

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    // Provide more detailed error message
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }
    next(error);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    // Make sure user is post owner or admin
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Not authorized to delete this post",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    const comment = {
      user: req.user.id,
      content: req.body.content,
    };

    post.comments.push(comment);
    await post.save();

    // Populate the new comment
    await post.populate("comments.user", "name avatar");

    res.status(201).json({
      success: true,
      data: post.comments[post.comments.length - 1],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search posts
// @route   GET /api/posts/search
// @access  Public
const searchPosts = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Please provide a search query",
      });
    }

    const posts = await Post.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { tags: { $in: [new RegExp(q, "i")] } },
      ],
    })
      .populate("author", "name email avatar")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
};
