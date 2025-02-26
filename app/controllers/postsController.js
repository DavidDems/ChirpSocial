const { Op } = require('sequelize');
const Post = require("../models/postsModel");
const npmlog = require("npmlog");

const validationPost = (post) => {
    if (!post.postTxt && !post.postImg) {
        return "Post must have either text or an image."; 
    }

    if (post.postTxt && !/^[A-Za-z0-9\-. !'*()%:;#@=+?,/]{1,280}$/.test(post.postTxt)) {
        return "Post can have 1 to 280 characters and contain only valid characters.";
    }

    return null;
}

const createPost = async (req, res) => {
    

    try {
        const replyId = req.body.replyId || null;
        const postTxt = req.body.postTxt || null;
        const postImg = req.file ? req.file.path : null;
        
        const validationError = validationPost({ postTxt, postImg });
        if (validationError) {
            npmlog.error("DB", "Validation error", validationError);
            return res.status(400).send({ message: validationError });
        }

        await Post.create({
            postTxt,
            postImg,
            replyId,
            publisherId: req.user.id,
        });
        res.status(201).send({ message: "Post has been created."});
    } catch (err) {
        npmlog.error("DB", "Error creating the post.", err);
        res.status(500).send({ message: "Error creating post."});
    }

};

const searchPost = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required."});
        }

        const posts = await Post.findAll({
            where: {
                postTxt: {
                    [Op.like]: `%${query}%`
                }
            }
        });

        if (posts.length === 0) {
            return res.status(404).send({ message: "No posts found."});
        }

        res.status(200).json(posts);

    } catch (err) {
        npmlog.error("DB", "Search failed", err)
        res.status(500).send({message: "Error seraching posts."});
    }
};


const getAllPosts = async (req, res) => {
    const replyId = req.query.replyId;

    try {
        if (replyId) {
            const replies = await Post.findAll({
                where: { replyId: replyId },
            });
            return res.status(200).send(replies);
        } else {
            const posts = await Post.findAll();
            res.status(200).send(posts);
        }
    } catch (err) {
        npmlog.error("DB", "Error retrieving posts", err);
        res.status(500).send({message: "Error retrieving posts."})
    }
};

const getOnePost = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.status(400).send({ message: "ID must be a number."});
    }

    try {
        const posts = await Post.findByPk(id);

        if (!posts) {
            return res.status(404).send({message: "ID not found."})
        }
        res.status(200).send(posts);
    } catch (err) {
        npmlog.error("DB", "Error retriving the post.", err);
        res.status(500).send({ message: "Error retrieving post."});
    }
};

const getReplyCount = async (req, res) => {
    const id = req.params.id;
    try {
        const count = await Post.count({
            where: { replyId: id },
        });
        res.status(200).send({ count });
    } catch (err) {
        npmlog.error("DB", "Error retrieving reply count", err);
        res.status(500).send({ message: "Error retrieving reply count." });
    }
};

const getRepostCount = async (req, res) => {
    const id = req.params.id;
    try {
        const count = await Post.count({
            where: { repostId: id },
        });
        res.status(200).send({ count });
    } catch (err) {
        npmlog.error("DB", "Error retrieving repost count", err);
        res.status(500).send({ message: "Error retrieving repost count." });
    }
};

const deletePost = async (req, res) => {
    const postId = req.params.id;
    try{
        console.log("Deleting post with ID:", req.params.postId);

        const posts = await Post.findOne({where: { postId }});

        if (!posts) {
            npmlog.warn("DB", "Post not found");
            return res.status(404).send({ message: "Post not found."})
        }

        await Post.destroy({where: { postId }})
        res.status(200).send({ message: "Post deleted."})

    } catch (err) {
        npmlog.error("DB", "Post delete failed", err);
        res.status(500).send({ message: "Error deleting post"});
    }
};

module.exports = {
    createPost,
    searchPost,
    getAllPosts,
    getOnePost,
    deletePost,
    getReplyCount,
    getRepostCount
  };
  