const FeaturedProduct = require("../models/featuredmodal");

const AddFeaturedProdcut = async (req, res) => {
  try {
    console.log("AddFeaturedProdcut");
    console.log(req.user);
    const { productId } = req.params;
    const adminId = req.user._id;

    const alreadyFeatured = await FeaturedProduct.findOne({ product: productId });
    if (alreadyFeatured) {
      return res.status(400).json({ message: "Product is already featured" });
    }

    const featured = await FeaturedProduct.create({
      product: productId,
      featuredBy: adminId
    });

    res.status(201).json({ success: true, featured });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const RemoveFeaturedProduct = async (req, res) => {
  try {
    console.log("RemoveFeaturedProduct");
    const { productId } = req.params;

    const featuredProduct = await FeaturedProduct.findOneAndDelete({ product: productId });
    if (!featuredProduct) {
      return res.status(404).json({ message: "Featured product not found" });
    }

    res.status(200).json({ success: true, message: "Featured product removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
  const GetFeaturedProducts = async (req, res) => {
  try {
    console.log("GetFeaturedProducts");

    const featuredProducts = await FeaturedProduct.find({}).populate("product"); 
    
    const formattedProducts = featuredProducts.map(product => {
            const formattedImages = product.product.images.map(img => {
                const base64 = Buffer.from(img.data).toString('base64');
                return `data:${img.contentType};base64,${base64}`;
            });
        
            return {
                ...product.product._doc,
                images: formattedImages
            };
        });
    res.status(200).json({ success: true, featuredProducts: formattedProducts });
  } catch (error) {
    console.error("Error in GetFeaturedProducts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  AddFeaturedProdcut,
  RemoveFeaturedProduct,
  GetFeaturedProducts
};
