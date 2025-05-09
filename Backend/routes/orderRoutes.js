const express = require("express");
const router = express.Router();
const protect = require("../middlewares/Isauth");

const {
  getAllOrders,
  AddOrders,
  DeleteOrder,
  updateOrders,
} = require("../controllers/ordercontroller"); // Adjust path as necessary

// Public routes
router.get("/", getAllOrders);//add isadmin middleware
router.post("/add",protect ,AddOrders);
router.post("/delete",DeleteOrder);
router.post("/update",protect,updateOrders);


module.exports = router;
