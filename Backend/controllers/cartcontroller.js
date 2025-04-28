const Cart=require("../models/cartmodel");
const Product=require("../models/productModel");

const addToCart=async(req,res)=>{
    const{userId,productId,quantity}=req.body;

    let cart=await Cart.findOne({user:userId});

    const product=await Product.findById({productId});
   
    if(!product){
        res.send(400).json({message:'Product not found'});
}
 const price=Product.price;
 const item={product:productId,quantity,price};

 if(!Cart){
    cart=new Cart({user:userId,item:[item],totalprice:price*quantity})

 }
 else{
    const existingitem=Cart.item.findIndex(i=>i.product.toString()==productId);
    if(existingitem>=0){
        Cart.items[existingitem].quantity+=quantity;
    }
    else{
        Cart.items.push(item);
    }
    Cart.totalprice+=price*quantity;
 }

 await Cart.save();
 res.status(200).json(cart);
    
};