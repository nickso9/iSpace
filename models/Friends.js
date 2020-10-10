
module.exports = function(sequelize, DataTypes) {
    const Friend = sequelize.define('friends', {
        list: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
       
    })
    
    Friend.associate = models => {
        Friend.belongsTo(models.users, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    
    return Friend
    }
    