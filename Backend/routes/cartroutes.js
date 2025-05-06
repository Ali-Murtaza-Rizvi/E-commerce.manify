const express = require("express");
const {addToCart} = require("../controllers/cartcontroller");
const router = express.Router();

router.post("/add", addToCart);



module.exports = router;
