module.exports = function(sequelize, DataTypes) {
const Post = sequelize.define('posts', {
    headline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
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




