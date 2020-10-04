
module.exports = function(sequelize, DataTypes) {
const User = sequelize.define('users', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    } 
});

User.associate = models => {
    User.hasMany(models.posts, {
        onDelete: 'cascade'
    })
};

User.associate = models => {
    User.hasOne(models.Profile, {
        onDelete: 'cascade'
    })
};
    return User;
}







