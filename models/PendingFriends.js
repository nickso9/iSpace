module.exports = function(sequelize, DataTypes) {
    const PendingFriend = sequelize.define('pendingfriends', {
        pendinglist: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
       
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
    