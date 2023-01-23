const express = require('express');
const authController = require('../../controllers/auth');
const categoryController = require("../../controllers/category")
const categoryModel = require("../../models/category")
const verifyJWT = require('../../middleware/VerifyJwt')
const router = express.Router()
const adminChecker = require("../../middleware/userchecker")


router.route("/create").post(verifyJWT, adminChecker, categoryController.addCtaegory)
router.route("/get").get(categoryController.getCategories)


module.exports= router