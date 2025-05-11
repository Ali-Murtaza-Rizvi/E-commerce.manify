const Cart = require("../models/cartmodel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");


const addToCart = async (req, res) => {
    //change this user ID should come from token using auth middleware
    const userId = req.user._id; 
    console.log(userId);
    const {selectedProduct} = req.body;
  
    let cart = await Cart.findOne({user:userId});
    const productId = selectedProduct._id;
    const quantity = selectedProduct.selectedQuantity;
  
    const product = await Product.findById(selectedProduct._id);
  
    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }
  
    const price = product.price;
    const item = { product: productId, quantity, price };
  
    if (!cart) {
      cart = new Cart({ user: userId, items: [item], totalprice: price * quantity });
    } else {
      const existingItemIndex = cart.items.findIndex(i => i.product.toString() === productId);
      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push(item);
      }
      cart.totalprice += price * quantity;
    }
  
    await cart.save();
    res.status(200).json(cart);
  };
const GetCart = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }

        // Populate with images too
        const cart = await Cart.findOne({ user: userId }).populate("items.product", "name price images");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "No cart found for this user.",
            });
        }

        // Convert image buffer to base64
        const updatedCartItems = cart.items.map((item) => {
            const product = item.product;

            // Default to null if no image
            let base64Image = null;

            if (product.images && product.images.length > 0) {
                const image = product.images[0];
                base64Image = `data:${image.contentType};base64,${image.data.toString('base64')}`;
            }

            return {
                ...item._doc,
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: base64Image,
                },
            };
        });

        res.status(200).json({
            success: true,
            cartItems: updatedCartItems,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const delById = async (req, res) => {
    try {
        //change this user ID should come from token using auth miidleware
        const { userId, productId } = req.body;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid User ID.",
            });
        }

        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "No cart found for this user.",
            });
        }

        // Find the product index in the cart items
        const productIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Product not found in the cart.",
            });
        }

        // Remove the product from the cart
        cart.items.splice(productIndex, 1);

        // Recalculate the total price
        cart.totalprice = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        // Save the updated cart
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
            cart, // Return the updated cart for confirmation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const ClearCart=async(req,res)=>{
    try{
        //change this user ID should come from token using auth miidleware
        const{userId}=req.body;
        const cart=await Cart.findOneAndDelete(userId);

        if(!cart){
            return res.status(404).json({
                sucess:false,
                message:"no cart found"
            });
        }
        res.status(200).json({ success: true, message: "Cart deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    
};
const updatecart = async (req, res) => {
    try {
         //change this user ID should come from token using auth miidleware
        const { userId, productId, quantity } = req.body; // Destructure orderId, products, and status from the request body

        // Find the order by ID
        const cart = await Cart.findById(userId);

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "cart not found.",
            });
        }
        const  itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart." });
        }

        // Update quantity or remove item if quantity is 0
        if (quantity === 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = { addToCart,GetCart,ClearCart,updatecart,delById};
