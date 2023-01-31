const express = require("express");
const authController = require("../controllers/auth");
const verifyJWT = require("../middleware/VerifyJwt");
const router = express.Router();
const {
  validateSignUp,
  validateSignIn,
  validateResult,
} = require(`../middleware/validator`);
const cookieParser = require("cookie-Parser");

router.use(cookieParser());
router
  .route("/sign-up")
  .post(validateSignUp, validateResult, authController.postSignUp);
router
  .route("/sign-in")
  .post(validateSignIn, validateResult, authController.postSignIn);

router.route("/secret").post(verifyJWT, (req, res) => {
  console.log("it wokred secret i mean");
  res.json({ woked: "hi" });
});

router.route("/secret").get(verifyJWT, (req, res) => {
  console.log("it wokred secret i mean");
  res.json({ woked: "hi" });
});

module.exports = router;
