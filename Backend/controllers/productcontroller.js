const Product=require('../models/productModel');

//add a new product(admin only)

const addProduct=async(req,res)=>{
    try{
        const{name,price,description,category,stock}=req.body;

        const newProduct=new Product({
            name,
            price,
            description,
            category,
            stock,
            image:req.file? req.file.path:null,
        });
        
        const savedProduct=await newProduct.save();
        res.status(201).json({ success: true, product: savedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Fetch all products
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getById=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({success:false,message:'product not found'});
     }
     res.status(200).json({sucess:true,product});
    } catch(error){
        res.status(500).json({sucess:false,message:error.message});
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productName, price, description, category, stock } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                productName,
                price,
                description,
                category,
                stock,
                image: req.file ? req.file.path : undefined, // Update image if provided
            },
            { new: true } // Return the updated product
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Delete a product (Admin only)
 */
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Delete by ID

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
    