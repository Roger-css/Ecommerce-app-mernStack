const express = require('express');
const authController = require('../controllers/auth');
const refreshToken = require(`../middleware/refreshToken`)
const verifyJWT = require('../middleware/VerifyJwt')
const router = express.Router()
const cookieParser = require('cookie-Parser');


router.post("/sign-up", authController.postSignUp)
router.route("/sign-in").post(authController.postSignIn)

router.route("/secret").post(verifyJWT, (req, res)=> {
    console.log(req.role);
    console.log(req.apiToken);
    console.log("it wokred");
    console.log(req.bob);
    res.send("hi")


})


module.exports = router