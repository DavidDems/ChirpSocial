const express = require('express');

const authenticateUser = require('../middleware/authMiddleware.js');
const { uploadPost } = require('../middleware/upload.js');

const {
    createPost,
    searchPost,
    getAllPosts,
    getOnePost,
    deletePost,
} = require("../controllers/postsController.js");

const router = express.Router();

router.post("/posts", authenticateUser, uploadPost.single("postImg"), createPost);

router.get("/posts/search", searchPost);

router.get("/posts", getAllPosts);

router.get("/posts/:id", getOnePost);

router.delete("/posts/:id", deletePost);

module.exports = router;
