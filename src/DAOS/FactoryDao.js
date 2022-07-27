const sequelize  = require("../db/dbMySql")
const yargs = require('yargs/yargs')
const { hideBin } = require("yargs/helpers")
const UsuarioDaoMongoose = require("./UserDaoMongoose")
const UsuarioDaoSequelize = require("./UserDaoSequelize")
require("dotenv").config()
const url = process.env.MONGO_URL_SERVER 


const argv = yargs(hideBin(process.argv)).option("d", {
    alias: "datos", 
    type: "string",
    default: "mongoose",
    describe: "Selecciona la base de datos a utilizar por el programa con sus usuarios",
    demandOption: "Porfavor ingresar mongoose o sequelize como persistencia para poder correr este programa."
}).argv

let dao

async function daoSelect(){
    switch (argv.datos){
        case "mongoose":
            dao = new UsuarioDaoMongoose(url, "facundo")
            await dao.connectMongoDb()
            break
    
        case "sequelize":
            dao = new UsuarioDaoSequelize(sequelize)
            await dao.connectMySql()
            break
    }
}

console.log(argv)
daoSelect()

class FactoryDao {
    static getDao() {
        return dao
    }
}

module.exports = FactoryDao