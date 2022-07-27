const User = require("../models/userModelSequelize")
const bcrypt = require("bcrypt")
const sequelize = require("../db/dbMySql")

class UserDaoSequelize {
    static #instancia
    constructor(sequelize){
        this.sequelize = sequelize
        if(!UserDaoSequelize.#instancia){
            return UserDaoSequelize.#instancia
        }
        return UserDaoSequelize.#instancia = new UsuarioDaoMongoose
    }

    async synchronizing(){
        await User.sync()
    }
    
   
    async connectMySql(){
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }
  
    encryptPassword(password){
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    
    async getUser(email){
        this.synchronizing()
        const user = await User.findOne({where : { email }})
        return user
    }   
    
    async createUser(email, password){
        this.synchronizing()
        let hashPassword = this.encryptPassword(password)
        const newUser = await User.create({email, password: hashPassword})
        return newUser
    }
    
    async getUserById(id){
        this.synchronizing()
        const user = await User.findOne({where: { id }})
        return user
    }
    
}

module.exports = UserDaoSequelize 