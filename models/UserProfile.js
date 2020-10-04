module.exports = function(sequelize, DataTypes) {
const UserProfile = sequelize.define('Profile', {
    image: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    birthday: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    headline: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
});

UserProfile.associate = models => {
    UserProfile.belongsTo(models.users, {
        foreignKey: {
            allowNull: false
        }
    })
};

 return UserProfile
}





