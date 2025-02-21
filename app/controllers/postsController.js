const Sequelize = require("sequelize");
const db = require("../config/dbConnection");
const Post = db.Post;
const npmlog = require("npmlog");

const validationPost = (post) => {
    if (!post.replyId && !post.repostId) {
        if (!post.postHeader) {
            return "Post must have a header.";
        }

        if (!post.postTxt && !post.postImg) {
            return "Post must have either text or an image.";
        } 
    } else {
        if (!post.postTxt && !post.postImg) {
            return "Reply or Repost must have either text or an image.";
        }
    }

    if (!/^[A-Za-z0-9\-. ]{1,255}$/.test(post.postHeader)) {
        return "Post Header can be between 1 and 255 characters while only containing letters, digits, dashes, dots, and spaces.";
    }

    if (!/^[A-Za-z0-9\-. ]{0,280}$/.test(post.postTxt)) {
        return "Post can be a maximum of 280 characters and contain only letters, digits, dashes, dots, and spaces.";
    }

    if (post.likes < 0 || typeof post.likes !== "integer") {
        return "Likes must not be a negative integer"
    }

    const allowedImgTypes = ['image/png', 'image/jpeg'];
    if (post.postImg && !allowedImgTypes.includes(post.postImg.mimetype)) {
        return "Only PNG and JPG images are allowed."
    }

    

    return null;
}