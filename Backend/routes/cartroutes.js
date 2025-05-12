const express = require("express");
const {addToCart,GetCart,ClearCart,updatecart,delById} = require("../controllers/cartcontroller");
const protect = require("../middlewares/Isauth");
const router = express.Router();

router.post("/add",protect, addToCart);
router.get("/getcart",protect,GetCart);
router.post("/delete",protect,ClearCart);
router.post("/delbyid",protect,delById);
router.post("/update",protect,updatecart);




module.exports = router;
