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
