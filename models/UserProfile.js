module.exports = function(sequelize, DataTypes) {
const UserProfile = sequelize.define('profiles', {
    image: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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





