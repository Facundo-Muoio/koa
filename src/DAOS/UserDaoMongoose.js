const User = require("../models/user")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

class UsuarioDaoMongoose {

   static #instancia 

    constructor(url){
        console.log(UsuarioDaoMongoose.#instancia)
        this.url = url
        if(!UsuarioDaoMongoose.#instancia){ 
            return UsuarioDaoMongoose.#instancia
        }
        console.log(UsuarioDaoMongoose.#instancia)
        return UsuarioDaoMongoose.#instancia = new UsuarioDaoMongoose
    }

    async connectMongoDb(){
        try{
            await mongoose.connect(this.url)
            console.log("Connected succesfully to MongoDB")
        }   catch(err) {
            console.log(err)
        }
    }

        encryptPassword(password) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    
    
    async getUser(email) {
        const user = await User.findOne({email})
        return user
    }
    
    async createUser(email, password){
        const newUser = new User()
        newUser.email = email
        newUser.password = this.encryptPassword(password)
        await newUser.save()
        return newUser
    }
    
    async getUserById(id){
        const user = await User.findById(id)
        return user
    }
    
}

module.exports = UsuarioDaoMongoose