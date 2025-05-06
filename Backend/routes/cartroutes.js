const express = require("express");
const {addToCart,GetCart,ClearCart,updatecart} = require("../controllers/cartcontroller");
const router = express.Router();

router.post("/add", addToCart);
router.get("/getcart",GetCart);
router.post("/delete",ClearCart);
router.post("/update",updatecart);



module.exports = router;
