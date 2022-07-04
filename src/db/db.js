const mongoose = require("mongoose")
require("dotenv").config()

//Conection URL
const url = process.env.MONGO_URL_SERVER 

 async function connect () {
     try{
        await mongoose.connect(url)
        console.log("Connected succesfully to DB")
     }catch(err){
         console.log(err)
     }
 }

 module.exports = { connect }


