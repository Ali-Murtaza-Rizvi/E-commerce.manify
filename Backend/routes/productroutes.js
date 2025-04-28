const express = require("express");
const router = express.Router();
const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController"); // Adjust path as necessary
const isAdmin = require("../middlewares/isAdmin"); // Middleware for admin protection

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin-only routes
router.post("/", isAdmin, addProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

module.exports = router;
