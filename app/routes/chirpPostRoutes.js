const express = require('express');

const authenticateUser = require('../middleware/authMiddleware.js');
const { uploadPost } = require('../middleware/upload.js');

const {
  createPost,
  searchPost,
  getAllPosts,
  getOnePost,
  deletePost,
  getReplyCount,
  getRepostCount,
} = require('../controllers/postsController.js');

const router = express.Router();

router.post(
  '/posts',
  authenticateUser,
  uploadPost.single('postImg'),
  createPost
);

router.get('/posts/search', searchPost);

router.get('/posts', getAllPosts);

router.get('/posts/:id', getOnePost);

router.delete('/posts/:id', deletePost);

router.get('/posts/replyCount/:id', getReplyCount);

router.get('/posts/repostCount/:id', getRepostCount);

module.exports = router;
