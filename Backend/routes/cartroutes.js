const express = require("express");
const {addToCart,GetCart,ClearCart,updatecart,delById} = require("../controllers/cartcontroller");
const router = express.Router();

router.post("/add", addToCart);
router.get("/getcart",GetCart);
router.post("/delete",ClearCart);
router.post("/delbyid",delById);
router.post("/update",updatecart);




module.exports = router;
