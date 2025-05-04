const Order=require("../models/ordermodel");
const Product=require("../models/productModel");

const AddOrders = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from the authenticated request
        const items = req.body; // Items should be an array of products

        // Validate the input format
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "Order must contain at least one product." });
        }

        // Check each product and prepare the order products array
        const products = [];
        let totalPrice = 0;

        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({ success: false, message: `Product not found: ${item.productId}` });
            }

            if (item.quantity < 1) {
                return res.status(400).json({ success: false, message: `Quantity for product ${item.productId} must be at least 1.` });
            }

            products.push({
                product: product._id,
                quantity: item.quantity,
            });

            totalPrice += product.price * item.quantity; // Calculate total price
        }

        // Create and save the order
        const order = new Order({
            user: userId,
            products,
            totalprice: totalPrice,
        });

        await order.save();

        res.status(201).json({ success: true, message: "Order placed successfully.", order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getAllOrders=async(req,res)=>{
    try{

        const order=await Order.find();
        
    if(!order || order.length==0){
        return res.status(404).json({
            success:false,
            message:"no orders found!"
        });
    }
    
        res.status(200).json({
            success:true,order
        });
} 
  catch(error){
    res.status(500).json({ success: false, message: error.message });
  }
    }
    
    const updateOrders = async (req, res) => {
        try {
            const { orderId, products, status } = req.body; // Destructure orderId, products, and status from the request body
    
            // Find the order by ID
            const order = await Order.findById(orderId);
    
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found.",
                });
            }
    
            // Update products if provided
            if (products) {
                const updatedProducts = [];
                let totalPrice = 0;
    
                for (const item of products) {
                    const product = await Product.findById(item.productId); // Validate each product by its ID
    
                    if (!product) {
                        return res.status(404).json({ success: false, message: `Product not found: ${item.productId}` });
                    }
    
                    if (item.quantity < 1) {
                        return res.status(400).json({ success: false, message: `Quantity for product ${item.productId} must be at least 1.` });
                    }
    
                    updatedProducts.push({
                        product: product._id,
                        quantity: item.quantity,
                    });
    
                    // Update total price
                    totalPrice += product.price * item.quantity;
                }
    
                // Update order's products and total price
                order.products = updatedProducts;
                order.totalprice = totalPrice;
            }
    
            // Update status if provided
            if (status) {
                if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(status)) {
                    return res.status(400).json({ success: false, message: "Invalid status value." });
                }
                order.status = status;
            }
    
            // Save the updated order
            await order.save();
    
            res.status(200).json({
                success: true,
                message: "Order updated successfully.",
                order,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    
const DeleteOrder=async(req,res)=>{
    try{
        const{orderId}=req.body;
        const order=await Order.findByIdAndDelete(orderId);

        if(!order){
            return res.status(404).json({
                sucess:false,
                message:"order not found"
            });
        }
        res.status(200).json({ success: true, message: "Order deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    }

module.exports={getAllOrders,AddOrders,updateOrders,DeleteOrder};