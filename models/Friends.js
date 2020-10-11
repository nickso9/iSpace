
module.exports = function(sequelize, DataTypes) {
    const Friend = sequelize.define('friends', {
        friendlist: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
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
    