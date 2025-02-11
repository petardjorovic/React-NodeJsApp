const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const authController = require("../controllers/AuthController");

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getSingleProduct);

router.post("/auth/register", authController.register);

router.post("/auth/login", authController.login);

module.exports = router;
