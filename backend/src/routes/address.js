const express = require("express")
const { addAddress, getAddress } = require("../controllers/address")
const router = express.Router()
const verifyJwt = require("../middleware/VerifyJwt")

router.post("/user/address/create", verifyJwt, addAddress)
router.post("/user/getaddress", verifyJwt, getAddress)

module.exports = router
