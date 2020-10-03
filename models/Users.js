const Sequelize = require('sequelize')
const db = require('../config/database')

const User = db.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    } 
})

User.sync()

module.exports = User