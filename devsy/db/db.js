require('dotenv').config({path:'../.env'})

const mongoose = require('mongoose');

//const config = require('config');

const db = process.env.MONGO_URI


const connectDB = async () => {
    try {
        await mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false })

        console.log("MongoDB connected.....");
    } catch (error) {
        console.error(error.message);

        process.exit(1)
    }
}

module.exports = connectDB