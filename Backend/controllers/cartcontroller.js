const Cart = require("../models/cartmodel");
const Product = require("../models/productModel");


const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    let cart = await Cart.findOne({ user: userId });
  
    const product = await Product.findById(productId);
  
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
  
module.exports = { addToCart, };
