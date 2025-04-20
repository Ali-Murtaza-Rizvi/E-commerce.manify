const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");

dbConnect();  

const app = express();

//Middleware 
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes); // Use the route at /api/auth/login or /api/auth/register

//Start the server 
const PORT = process.env.PORT || 7002;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});