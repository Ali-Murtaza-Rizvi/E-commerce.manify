const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require('../middlewares/Isauth'); // Middleware for authentication
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const isAdmin = require("../middlewares/isAdmin"); // Middleware for admin protection

const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    Searchbycat,
} = require("../controllers/productcontroller"); // Adjust path as necessary

// Public routes
router.get("/", getAllProducts);
router.get("/user/:id", getProductById);

//admin routes
router.post("/add",upload.array("images", 5),protect, addProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);
router.get("/searchbycat",Searchbycat);
// router.get("/admin",protect, getAllProductsByAdmin); 
module.exports = router;
