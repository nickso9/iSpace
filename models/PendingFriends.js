module.exports = function(sequelize, DataTypes) {
    const PendingFriend = sequelize.define('pendingfriends', {
        newFriendId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        image: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
    })
    
    PendingFriend.associate = models => {
        PendingFriend.belongsTo(models.users, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    
    return PendingFriend
    }
    