const express = require("express");
const defaultController = require("../controllers/defaultController");

//? define router
const router = express.Router();

/* Application Routes */

//? default api
router.get("/", defaultController);

module.exports = router;