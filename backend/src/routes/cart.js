const express = require('express');
const verifyJwt = require("../middleware/VerifyJwt")
const cartController = require("../controllers/cart")
const router = express.Router()




router.post("/user/add-to-cart", verifyJwt, cartController.addToCart)


module.exports = router