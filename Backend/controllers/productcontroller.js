const Product=require('../models/productModel');


/*                                          ADMIN PRODUCT PAGE                                          */
//display all products added by admin   
// const getAllProductsByAdmin=async(req,res)=>{
//     try {
//         const adminId = req.user._id;
//         console.log("Decoded User:", req.user);
//         const products = await Product.find({ admin_id: adminId });
//         console.log(products.length);
//         if (!products.length) {
//           return res.status(404).json({ success: false, message: 'No products found for this admin' });
//         }

//         const formattedProducts = products.map(product => {
//             const formattedImages = product.images.map(img => {
//                 const base64 = Buffer.from(img.data).toString('base64');
//                 return `data:${img.contentType};base64,${base64}`;
//             });
        
//             return {
//                 ...product._doc,
//                 images: formattedImages
//             };
//         });
//         res.status(200).json({ success: true, products: formattedProducts });
//         // res.status(200).json({ success: true, products });
//       } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//       }
// };

//add a new product(admin only)
const addProduct=async(req,res)=>{
    try{
        const{name,price,description,category,stock}=req.body;
        const images = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        }));
        console.log(req.user._id);
        const newProduct=new Product({
            name,
            price:Number(price),
            description,
            category,
            stock:Number(stock),
            images, // Store the images in the database
            admin_id:req.user._id, // Assuming req.user contains the authenticated admin's ID
        });
        const savedProduct=await newProduct.save();
        res.status(201).json({ success: true, product: savedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Admin can update product details
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

/*                                          USER PRODUCT PAGE                                          */

//For User products page
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Fetch all products
        const formattedProducts = products.map(product => {
            const formattedImages = product.images.map(img => {
                const base64 = Buffer.from(img.data).toString('base64');
                return `data:${img.contentType};base64,${base64}`;
            });
        
            return {
                ...product._doc,
                images: formattedImages
            };
        });
        res.status(200).json({ success: true, formattedProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//For USer Product page
const getProductById=async(req,res)=>{
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

const Searchbycat=async(req,res)=>{
    try{
        const {category}=req.query;
        console.log(category);

        if(!category){
            return res(400).json({
                sucess:false,
                message:"category is required to find product",
            })
        }

        const product=await Product.find({category:category});

        if(!product || product.length==0){
            return res(404).json({
                sucess:false,
                messaage:"no product exist in this category",
            })
        }
        const formattedProducts = product.map(product => {
                        const formattedImages = product.images.map(img => {
                            const base64 = Buffer.from(img.data).toString('base64');
                            return `data:${img.contentType};base64,${base64}`;
                        });
                    
                        return {
                            ...product._doc,
                            images: formattedImages
                        };
                    });

        res.status(200).json({
            sucess:true,
            formattedProducts,
        });

    }
    catch(error){
        res.status(500).json({sucess:false,message:error.message});
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    Searchbycat,

};
    