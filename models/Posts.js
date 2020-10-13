
module.exports = function(sequelize, DataTypes) {
const Post = sequelize.define('posts', {
    headline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wallPost: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
   
})

Post.associate = models => {
    Post.belongsTo(models.users, {
        foreignKey: {
            allowNull: false
        }
    })
}

return Post
}




