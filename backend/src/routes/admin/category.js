const express = require('express');
const authController = require('../../controllers/auth');
const categoryController = require("../../controllers/category")
const categoryModel = require("../../models/category")
const verifyJWT = require('../../middleware/VerifyJwt')
const router = express.Router()


router.route("/create").post(verifyJWT, categoryController.addCtaegory)
router.route("/get").post(categoryController.getCategories)


module.exports= router