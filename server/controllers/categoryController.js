// categoryController.js - Category controller

const Category = require("../models/Category");
const Post = require("../models/Post");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()
      .populate("createdBy", "name email")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
const getCategory = async (req, res, next) => {
  try {
    // Find by ID or slug
    const category = await Category.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
    }).populate("createdBy", "name email");

    if (!category) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    // Get posts count for this category
    const postsCount = await Post.countDocuments({ category: category._id });

    res.status(200).json({
      success: true,
      data: {
        ...category.toObject(),
        postsCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin only)
const createCategory = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const category = await Category.create(req.body);

    await category.populate("createdBy", "name email");

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin only)
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("createdBy", "name email");

    if (!category) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin only)
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    // Check if category has posts
    const postsCount = await Post.countDocuments({ category: category._id });
    if (postsCount > 0) {
      return res.status(400).json({
        success: false,
        error: `Cannot delete category with ${postsCount} posts. Please reassign or delete posts first.`,
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
