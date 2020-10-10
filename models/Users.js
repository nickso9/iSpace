
module.exports = function(sequelize, DataTypes) {
const User = sequelize.define('users', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regDone: {
        type: DataTypes.STRING,
        defaultValue: 0
    } 
    
});



User.associate = models => {
    User.hasOne(models.profiles, {
        onDelete: 'cascade'
    })

    User.hasMany(models.posts, {
        onDelete: 'cascade'
    })

    User.hasMany(models.friends, {
        onDelete: 'cascade'
    })

    User.hasMany(models.pendingfriends, {
        onDelete: 'cascade'
    })

};
    return User;
}







