const express = require("express");
const router = express.Router();
const protect = require('../middlewares/Isauth'); 

const { 
    RemoveFeaturedProduct,
    GetFeaturedProducts,
    AddFeaturedProdcut
} = require("../controllers/featuredController");


router.post("/feature/:productId", protect, AddFeaturedProdcut);
router.delete("/remove/:productId", RemoveFeaturedProduct);
router.get("/getfeatured", GetFeaturedProducts);
module.exports = router;