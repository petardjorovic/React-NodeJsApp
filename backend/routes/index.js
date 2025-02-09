const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getSingleProduct);

module.exports = router;
