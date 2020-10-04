// const Sequelize = require('sequelize')

// const db = new Sequelize('ispace', 'root', '12345' , {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         aquire: 30000,
//         idle: 10000
//     }
// })
// module.exports = db


// const User = require('../models/Users')
// const Post = require('../models/Posts')
// const UserProfile = require('../models/UserProfile')


// User.associate = models => {
//     User.hasMany(models.Post, {
//         onDelete: 'cascade'
//     })
// }

// User.associate = models => {
//     User.hasOne(models.UserProfile, {
//         onDelete: 'cascade'
//     })
// }

// Post.associate = models => {
//     Post.belongsTo(models.User, {
//         foreignKey: {
//             allowNull: false
//         }
//     })
// }

// UserProfile.associate = models => {
//     UserProfile.belongsTo(models.User, {
//         foreignKey: {
//             allowNull: false
//         }
//     })
// }

