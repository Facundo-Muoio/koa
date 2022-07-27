const mongoose = require("mongoose")
require("dotenv").config()
const url = process.env.MONGO_URL_SERVER

async function connectMongoDb(){
    try{
        await mongoose.connect(url)
        console.log("Connected succesfully to DB")
    }   catch(err) {
        console.log(err)
    }
}
 module.exports = { connectMongoDb }


