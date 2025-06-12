const mongoose = require("mongoose");

const connectDb = async ()=>{
    try{
        // await mongoose.connect(`${process.env.DB_URL}/thinkboard`)
        await mongoose.connect(`${process.env.DB_URL}`)
        console.log("Connected to the database successfully");
    }catch(err){
        console.log("Error in connecting to the database", err.message)
    }
}

module.exports = connectDb;