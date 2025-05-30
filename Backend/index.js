const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productroutes"); 
const orderRoutes=require("./routes/orderRoutes");
const cartroutes=require("./routes/cartroutes")
const featuredRoutes = require("./routes/featured");

dbConnect();  
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
//Middleware 
// app.use(express.json());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use(cors());
//Routes
app.use("/api/auth", authRoutes); // Use the route at /api/auth/login or /api/auth/register
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts",cartroutes);
app.use("/api/featured", featuredRoutes);
//Start the server 
const PORT = process.env.PORT || 7002;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});