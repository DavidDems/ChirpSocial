

module.exports = (sequelize, Sequelize) => {
    const Post = Sequelize.define("Post", {
        postId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        publisherId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userId'
            }
        },
        replyId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Post',
                key: 'postId'
            }
        },
        originalReply: {
            type: Sequelize.INTEGER,
        },
        repostId: {
            type: Sequelize.INTEGER,
        },
        postHeader: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postTxt: {
            type: Sequelize.TEXT,
        },
        postImg: {
            type: Sequelize.BLOB("medium"),
        },
        postDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        likes: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        }, 
    },{
        timestamps: false,
    });
    return Post;
};