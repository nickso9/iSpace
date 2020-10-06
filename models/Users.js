


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
        type: DataTypes.BOOLEAN
    } 
    
});

User.associate = models => {
    User.hasMany(models.posts, {
        onDelete: 'cascade'
    })
};

User.associate = models => {
    User.hasOne(models.profiles, {
        onDelete: 'cascade'
    })
};
    return User;
}







