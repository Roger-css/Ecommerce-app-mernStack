const express = require("express");
const authController = require("../controllers/auth");
const verifyJWT = require("../middleware/VerifyJwt");
const router = express.Router();
const {
  validateSignUp,
  validateSignIn,
  validateResult,
} = require(`../middleware/validator`);
const cookieParser = require('cookie-Parser');


router.use(cookieParser())
router
  .route("/sign-up")
  .post(validateSignUp, validateResult, authController.postSignUp);
router
  .route("/sign-in")
  .post(validateSignIn, validateResult, authController.postSignIn);

router
  .route("/sign-out")
  .post(verifyJWT, authController.postSignOut);


module.exports = router