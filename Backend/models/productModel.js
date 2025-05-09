const mongoose=require('mongoose');
const { create } = require('./userModel');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
   },
   description:{
     type:String,
     required:true,
   },
   price:{
    type:Number,
    required:true,
   },
   category:{
    type:String,
    required:true,
   },
  quantity:{
    type:Number,
    required:true,
    min:1,
  },
  reviews:[
     {
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
      },
      comment:{ type:String},
      rating:{type:Number},
     },
  ],
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User (admin) model
      required: true
    }
  
  ,

  images: [
    {
        data: Buffer,
        contentType: String
    }
],
   createdAt:{
    type:Date,
    default:Date.now,
   },
   updatedAt: {
    type: Date,
    default: Date.now,
},
}, 
{ timestamps: true }); 

const Product = mongoose.model('Product', productSchema);

module.exports = Product;