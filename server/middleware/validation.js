// validation.js - Validation middleware using express-validator

const { body, validationResult } = require("express-validator");

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// Validation rules for user registration
const validateRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors,
];

// Validation rules for user login
const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

// Validation rules for creating/updating a post
const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("excerpt")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Excerpt cannot exceed 200 characters"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
  handleValidationErrors,
];

// Validation rules for creating a category
const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 50 })
    .withMessage("Category name cannot exceed 50 characters"),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Description cannot exceed 200 characters"),
  handleValidationErrors,
];

// Validation rules for adding a comment
const validateComment = [
  body("content").trim().notEmpty().withMessage("Comment content is required"),
  handleValidationErrors,
];

module.exports = {
  validateRegistration,
  validateLogin,
  validatePost,
  validateCategory,
  validateComment,
};
