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

router.route("/secret").post(verifyJWT, (req, res) => {
<<<<<<< HEAD
  console.log(req.role);
  console.log(req.apiToken);
  console.log("it wokred");
  console.log(req.bob);
  res.send("hi");
=======
  console.log("it wokred secret i mean")
  res.json({woked: "hi"})
});

router.route("/secret").get(verifyJWT, (req, res) => {
  console.log("it wokred secret i mean")
  res.json({woked: "hi"})
>>>>>>> ad095f8e20bff1e1317fdba4ae90a50002c99ab2
});

module.exports = router