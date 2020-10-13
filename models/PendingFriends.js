module.exports = function(sequelize, DataTypes) {
    const PendingFriend = sequelize.define('pendingfriends', {
        newFriendId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
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
    