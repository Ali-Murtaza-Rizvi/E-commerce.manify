const Cart = require("../models/cartmodel");
const Product = require("../models/productModel");


const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Find the user's cart
        let cart = await Cart.findOne({ user: userId });

        // Find the product by ID
        const product = await Product.findById(productId);

        // Check if the product exists
        if (!product) {
            return res.status(400).json({
                message: 'Product not found',
            });
        }

        // Calculate the price of the item
        const price = product.price;
        const newItem = { product: productId, quantity, price };

        // If no cart exists, create a new one
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [newItem],
                totalprice: price * quantity,
            });
        } else {
            // Check if the product already exists in the cart
            const existingItemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productId
            );

            if (existingItemIndex >= 0) {
                // Update the quantity if the product exists
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // Add the new item to the cart
                cart.items.push(newItem);
            }

            // Update the total price
            cart.totalprice += price * quantity;
        }

        // Save the cart
        await cart.save();

        // Respond with the updated cart
        res.status(200).json({
            success: true,
            cart,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const Getcart=async(req,res)=>{
    try{
        const {userid}=req.query;

        if(!userid){
            return res.status(400).json({
                success:false,
                message:"user id needed",
            });
        }
        const cart=await Cart.findById({userid:user})

        if(!cart || cart.length==0){
            return res.status(404).json({
                sucess:false,
                message:"no cart found for this user",
            })
        }
        res.status(200).json({
            success: true,
            cart,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    

}
module.exports = { addToCart, };
