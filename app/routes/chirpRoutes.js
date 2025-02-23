const express = require('express');
const {
  getAllUsers,
  getUserById,
  searchUser,
  updateUserProfile,
} = require('../controllers/usersController.js');

const router = express.Router();

// // Get all Users
// router.get('/users', getAllUsers);
// // Get User by ID
// router.get('/users/:id', getUserById);
// // Search Users
// router.get('/users/search', searchUser);
// // Update Profile
router.patch('/users/:id', updateUserProfile);
// // Delete User by ID
// router.delete('/users/:id', deleteUser);

module.exports = router;
