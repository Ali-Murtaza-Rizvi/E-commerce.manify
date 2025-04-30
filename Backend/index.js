const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productroutes"); 


dbConnect();  
const cors = require('cors');

const app = express();

//Middleware 
app.use(express.json());

app.use(cors());
//Routes
app.use("/api/auth", authRoutes); // Use the route at /api/auth/login or /api/auth/register
app.use("/api/products", productRoutes);

//Start the server 
const PORT = process.env.PORT || 7002;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});