const { Op } = require('sequelize');
const Post = require("../models/postsModel");
const npmlog = require("npmlog");

const validationPost = (post) => {
    if (!post.replyId && !post.repostId) {
        return "Post must have either text or an image."; 
    } 

    if (!/^[A-Za-z0-9\-. !'*()%:;#@=+?,/]{0,280}$/.test(post.postTxt)) {
        return "Post can be a maximum of 280 characters and contain only letters, digits, dashes, dots, spaces, and exclamation points.";
    }

    const allowedImgTypes = ['image/png', 'image/jpeg'];
    if (post.postImg && !allowedImgTypes.includes(post.postImg.mimetype)) {
        return "Only PNG and JPG images are allowed."
    }
    
    return null;
}

exports.findAll = async (req, res) => {
    try {
       const posts = await Post.findAll();
       res.status(200).send(posts); 
    } catch (err) {
        npmlog.error("DB", "Error retrieving posts", err);
        res.status(500).send({message: "Error retrieving posts."})
    }
};

exports.findOne = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.status(400).send({ message: "ID must be a number."});
    }

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).send({message: "ID not found."})
        }
        res.status(200).send(post);
    } catch (err) {
        npmlog.error("DB", "Error retriving the post.", err);
        res.status(500).send({ message: "Error retrieving auction."});
    }
};

exports.create = async (req, res) => {
    const error = validationPost(req.body);
    if (error) {
        return res.status(400).send({ message: error})
    }

    try{
        const newPost = await Post.create ({
            ...req.body,
        });
        res.status(201).send({ message: "Post has been created.", data: newPost});
    } catch (err) {
        npmlog.error("DB", "Post creation failed:", err);
        res.status(500).send({ message: "Error creating post."})
    }
};



exports.delete = async (req, res) => {
    const postId = req.params.id;
    try{
        console.log("Deleting post with ID:", req.params.postId);

        const post = await Post.findOne({where: { postId }});

        if (!post) {
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



exports.search = async (req, res) => {
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
        npmlog.error("DB", "Search failed")
        res.status(500).send({message: "Error seraching posts."});
    }
}