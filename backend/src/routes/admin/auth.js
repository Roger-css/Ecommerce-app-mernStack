const express = require('express');
const authController = require('../../controllers/admin/auth')
const verifyJWT = require('../../middleware/VerifyJwt')
const router = express.Router()
const {validateSignUp, validateSignIn, validateResult} = require(`../../middleware/validator`)

router.route("/sign-up").post(validateSignUp, validateResult, authController.postSignUp)
router.route("/sign-in").post(validateSignIn, validateResult, authController.postSignIn)




module.exports = router