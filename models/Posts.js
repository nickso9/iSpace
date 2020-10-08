module.exports = function(sequelize, DataTypes) {
const Post = sequelize.define('posts', {
    headline: {
        type: DataTypes.STRING,
    },
    text: {
        type: DataTypes.STRING,
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




