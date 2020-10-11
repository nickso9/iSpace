
module.exports = function(sequelize, DataTypes) {
    const Friend = sequelize.define('friends', {
        friendlist: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        // ,
        // image: {
        //     type: DataTypes.STRING,
        // },
        // username: {
        //     type: DataTypes.STRING,
        // },
    
        // birthday: {
        //     type: DataTypes.STRING,
        // },
        // location: {
        //     type: DataTypes.STRING,
        // },
        // bio: {
        //     type: DataTypes.TEXT,
        // },
        // headline: {
        //     type: DataTypes.TEXT,
        // },
       
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
    