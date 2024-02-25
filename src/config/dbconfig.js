const mongoose = require('mongoose');

const connectDB = async()=>{
    //this is going to return us a new promise so we can bind the below code in async await code
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB Connected: ${conn.connection.host}`);
}

module.exports = connectDB;