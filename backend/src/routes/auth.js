const express = require('express');
const authController = require('../controllers/auth');
const verifyJWT = require('../middleware/VerifyJwt')
const router = express.Router()
const {validateSignUp, validateSignIn, validateResult} = require(`../middleware/validator`)

router.route("/sign-up").post(validateSignUp, validateResult, authController.postSignUp)
router.route("/sign-in").post(validateSignIn, validateResult, authController.postSignIn)



router.route("/secret").post(verifyJWT, (req, res)=> {
    console.log(req.role);
    console.log("it wokred");
    res.status(200).json({work:"hi"})
})


module.exports = router