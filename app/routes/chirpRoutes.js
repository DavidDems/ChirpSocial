const express = require('express');
const {
  validateRegistration,
  validateLogin,
} = require('../middleware/userValidation.js');
const {
  getAllUsers,
  getUserById,
  searchUser,
  updateUserProfile,
  registerUser,
  loginUser,
} = require('../controllers/usersController.js');

const router = express.Router();

// Register a new user with validation
router.post('/users/register', validateRegistration, registerUser);

// User login with validation
router.post('/users/login', validateLogin, loginUser);

// Get all Users
router.get('/users', getAllUsers);

// Get User by ID
router.get('/users/:id', getUserById);

// Search Users by (usernme or displayname)
router.get('/users/search', searchUser);

// Update user Profile
router.patch('/users/:id', updateUserProfile);
// Delete User by ID
// router.delete('/users/:id', deleteUser);

module.exports = router;