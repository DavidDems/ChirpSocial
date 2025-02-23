

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("Post", {
        postId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        publisherId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        replyId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Posts',
                key: 'postId'
            }
        },
        originalReplyId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Posts',
                key: 'postId'
            }
        },
        repostId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Posts',
                key: 'postId'
            }
        },
        postHeader: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        postTxt: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        postImg: {
            type: Sequelize.BLOB('medium'),
        },
        postDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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