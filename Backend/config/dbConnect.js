const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:"../.env"});

const dbConnect = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database connected: ${connect.connection.host}, ${connect.connection.name}`);
    }catch(err){
        console.log(err + " : Database connection failed");
        process.exit(1);
    }
};
module.exports = dbConnect;