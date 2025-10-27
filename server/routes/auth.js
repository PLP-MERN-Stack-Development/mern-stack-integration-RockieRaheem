// auth.js - Authentication routes

const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  validateRegistration,
  validateLogin,
} = require('../middleware/validation');

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);
router.put('/updateprofile', protect, updateProfile);

module.exports = router;
