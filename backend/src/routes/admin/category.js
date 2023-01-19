const express = require('express');
const authController = require('../../controllers/auth');
const categoryModel = require("../../models/category")
const verifyJWT = require('../../middleware/VerifyJwt')
const router = express.Router()


router.route("/create").post((req, res, next)=> {
        const {name, parentId} = req.body
        const categoryObj = {}
})


module.exports= router