const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  AddOrders,
  DeleteOrder,
  updateOrders,
} = require("../controllers/ordercontroller"); // Adjust path as necessary

// Public routes
router.get("/", getAllOrders);
router.post("/add", AddOrders);
router.post("/delete",DeleteOrder);
router.post("/update",updateOrders);


module.exports = router;
