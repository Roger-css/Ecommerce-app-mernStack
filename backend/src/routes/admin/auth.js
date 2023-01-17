const express = require('express');
const authController = require('../../controllers/admin/auth')
const verifyJWT = require('../../middleware/VerifyJwt')
const router = express.Router()


router.route("/sign-up").post(authController.postSignUp)
router.route("/sign-in").post(authController.postSignIn)

router.route("/secret").post(verifyJWT, (req, res)=> {
    console.log(req.role);
    console.log(req.apiToken);
    console.log("it wokred");
    res.send("hi")
})


module.exports = router