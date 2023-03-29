const express = require("express");
const verifyJwt = require("../middleware/VerifyJwt");
const cartController = require("../controllers/cart");
const router = express.Router();

router.post("/user/addToCart", verifyJwt, cartController.addToCart);
router.get("/user/getCartItems", verifyJwt, cartController.getCartItems);
router.delete("/user/getCartItems", verifyJwt, cartController.removeCartItems);

module.exports = router;
