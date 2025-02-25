const express = require('express');

const {
  validateRegistration,
  validateLogin,
} = require('../middleware/userValidation.js');

const authenticateUser = require('../middleware/authMiddleware.js');

const {
  uploadProfilePicture,
  getAllUsers,
  getUserById,
  searchUser,
  updateUserProfile,
  registerUser,
  loginUser,
} = require('../controllers/usersController.js');

const { uploadProfile } = require('../middleware/upload.js');

const router = express.Router();

// Registe a new user with validation
router.post('/users/register', validateRegistration, registerUser);

// User login with validation
router.post('/users/login', validateLogin, loginUser);

// Upload profile picture
router.post(
  '/users/:id/uploadProfilePicture',

  uploadProfile.single('profilePicture'),
  uploadProfilePicture
);

// Get all Users
router.get('/users', getAllUsers);

// Search Users by (usernme or displayname)
router.get('/users/search', searchUser);

// Get User by ID
router.get('/users/:id', authenticateUser, getUserById);

// Update user Profile (authentication needed)
router.patch('/users/:id', authenticateUser, updateUserProfile);

module.exports = router;
