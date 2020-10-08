module.exports = function(sequelize, DataTypes) {
const Post = sequelize.define('posts', {
    headline: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
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




