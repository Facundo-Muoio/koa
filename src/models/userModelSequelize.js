const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize("arqapi", "root", "", {
    host:"localhost",
    dialect: "mysql"
})

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User