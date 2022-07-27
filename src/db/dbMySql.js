const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("arqapi", "root", "", {
    host:"localhost",
    dialect: "mysql"
})

module.exports =  sequelize 