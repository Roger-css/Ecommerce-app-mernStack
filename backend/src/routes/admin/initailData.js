const express = require('express');
const verifyJWT = require('../../middleware/VerifyJwt')
const chechAdmin = require("../../middleware/adminchecker")
const initialDataController = require("../../controllers/admin/initialData.js")
const router = express.Router()

router.route("/initialData").get(verifyJWT, chechAdmin, initialDataController.getInitialData)

module.exports = router