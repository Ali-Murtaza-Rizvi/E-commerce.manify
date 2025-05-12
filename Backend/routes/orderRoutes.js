const express = require("express");
const router = express.Router();
const protect = require("../middlewares/Isauth");

const {
  getAllOrders,
  AddOrders,
  DeleteOrder,
  updateOrders,
  getOrdersByID,
  DeleteOrderById,
} = require("../controllers/ordercontroller"); // Adjust path as necessary

// Public routes
router.get("/", getAllOrders);//add isadmin middleware
router.post("/add",protect ,AddOrders);
//delete order by ID
router.post("/delete/:orderId",DeleteOrderById);
router.post("/delete",DeleteOrder);
router.post("/update",protect,updateOrders);
router.get("/getOrder",protect,getOrdersByID);

module.exports = router;
