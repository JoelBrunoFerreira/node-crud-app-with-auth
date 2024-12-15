const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB ${connect.connection.host}`.cyan.underline);
    }
    catch(e){
        console.error(`Couldn't connect with MongoDB ${e}`.red.underline);
        process.exit(1); // <-- exit with failure
    }
}

module.exports = connectDB;