const express = require("express");
const defaultController = require("../controllers/defaultController");
const { getProducts } = require("../controllers/productController");

//? define router
const router = express.Router();

/* Application Routes */

//? default api
router.get("/", defaultController);

//? get all products with search params and pagination
router.get("/get-products", getProducts)

module.exports = router;