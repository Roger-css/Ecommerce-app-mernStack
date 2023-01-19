const express = require('express');
const authController = require('../../controllers/auth');
const productyModel = require("../../models/product")
const verifyJWT = require('../../middleware/VerifyJwt')
const router = express.Router()


router.route("/create").post((req, res, next)=> {
    const {name, cost, price, catiegories} = req.body 
    try {
        const newproduct = new productyModel ({
            name,
            cost,
            catiegories
        })
        newproduct.save()
        return res.json(newproduct)
    } catch (error) {
        console.log(error);
    }
    res.send("sucess")
})

module.exports= router