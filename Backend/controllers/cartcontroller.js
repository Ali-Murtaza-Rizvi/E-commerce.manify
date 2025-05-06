const Cart = require("../models/cartmodel");
const Product = require("../models/productModel");


const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    let cart = await Cart.findOne({ user: userId });
  
    const product = await Product.findById(productId);
  
    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }
<<<<<<< HEAD
};
const GetCart = async (req, res) => {
    try {
        const { userId } = req.query;

        // Validate if userId is provided
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }

        // Find the cart associated with the given user ID
        const cart = await Cart.findById(userId);

        // Check if the cart exists
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "No cart found for this user.",
            });
        }

        // Respond with the cart details
        res.status(200).json({
            success: true,
            cart,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addToCart,GetCart};
=======
  
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
  
module.exports = { addToCart, };
>>>>>>> 2c99bf3f7ee7d164e3090f90e43eeaef6decb0bc
