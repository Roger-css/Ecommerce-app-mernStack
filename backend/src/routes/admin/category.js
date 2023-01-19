const express = require('express');
const authController = require('../../controllers/auth');
const categoryModel = require("../../models/category")
const verifyJWT = require('../../middleware/VerifyJwt')
const router = express.Router()


router.route("/create").post((req, res, next)=> {
    if(Array.isArray(req.body)){
        req.body.map(category => {
            const addedCategroy = new categoryModel ({
                name: category.name,
                parent: category.parent,
                category: category.category
            })

            addedCategroy.save((err, data)=> {
                if (err) return res.status(404).jsonp({message: err})
                console.log(data);
            })
        })
    }
    res.send("sucess")
})


module.exports= router