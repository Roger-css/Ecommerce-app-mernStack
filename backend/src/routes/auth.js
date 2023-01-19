const express = require("express");
const authController = require("../controllers/auth");
const verifyJWT = require("../middleware/VerifyJwt");
const router = express.Router();
const {
  validateSignUp,
  validateSignIn,
  validateResult,
} = require(`../middleware/validator`);

router
  .route("/sign-up")
  .post(validateSignUp, validateResult, authController.postSignUp);
router
  .route("/sign-in")
  .post(validateSignIn, validateResult, authController.postSignIn);

router.route("/secret").post(verifyJWT, (req, res) => {
  console.log(req.role);
  console.log(req.apiToken);
  console.log("it wokred");
  console.log(req.bob);
  res.send("I am a backend developer aaaah");
});

module.exports = router;
