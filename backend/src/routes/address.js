const express = require('express');
const { addAddress, getAddress } = require('../controllers/address');
const router = express.Router();


router.post('/user/address/create', addAddress);
router.post('/user/getaddress',   getAddress);

module.exports = router;