module.exports = function(sequelize, DataTypes) {
const UserProfile = sequelize.define('profiles', {
    image: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    birthday: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    headline: {
        type: DataTypes.TEXT,
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





