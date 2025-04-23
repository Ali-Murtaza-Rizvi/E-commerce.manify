const express = require("express");
const router = express.Router();
const isAdmin=require('../middlewares/isadmin');

const{
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
}=require('../controllers/productcontroller');
const { route } = require("./authRoutes");


router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post('/',isAdmin,addProduct);

router.put('/:id',isAdmin,updateProduct);

router.delete('/:id',isAdmin,deleteProduct);



module.exports = router;