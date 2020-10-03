const Sequelize = require('sequelize')
module.exports = new Sequelize('ispace', 'root', '12345' , {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
})