const express = require("express");
const {addToCart,GetCart} = require("../controllers/cartcontroller");
const router = express.Router();

router.post("/add", addToCart);
router.get("/getcart",GetCart);



module.exports = router;
