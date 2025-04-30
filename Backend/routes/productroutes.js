const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productcontroller"); // Adjust path as necessary
const isAdmin = require("../middlewares/isAdmin"); // Middleware for admin protection

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

///api/products
// Admin-only routes
// router.post("/add", addProduct);
router.post("/",upload.array("images", 5), addProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

module.exports = router;
