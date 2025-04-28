const mongoose=require('mongoose');
const { create } = require('./userModel');

const CartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    items:[
        {
            products:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                min:1,
            },
            price:{
                type:Number,
                required:true,
            },
        },
    ],

    totalprice:{
        type:Number,
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now,
       },

       updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Cart=moongoose.model('Cart',CartSchema);

module.exports=Cart;