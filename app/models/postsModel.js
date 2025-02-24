const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

const Post = sequelize.define(
    "Post", 
    {
        postId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        publisherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        replyId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Posts',
                key: 'postId'
            }
        },
        originalReplyId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Posts',
                key: 'postId'
            }
        },
        repostId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Posts',
                key: 'postId'
            }
        },
        postTxt: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        postImg: {
            type: DataTypes.BLOB('medium'),
        },
        postDate: {
            type: DataTypes.DATE,
            //defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }, 
    },
    {
    timestamps: false,
});

module.exports = Post;