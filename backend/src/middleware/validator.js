const expressValidator = require('express-validator');
const {check, validationResult } = require('express-validator')

// validate sign up
exports.validateSignUp = [
        check('username')
            .isLength({min:3})
            .withMessage('Minimmum length is 3')
            .isLength({max: 20})
            .withMessage("Max Length is  20 "),
        check("email")
            .isEmail()
            .withMessage('should be Email'),
        check('password')
            .isLength({min: 8})
            .withMessage('password length should be more than 6 chracters')        
]

exports.validateSignUp = (req, res, next)=> {
    const errors = validationResult(req)
    if(errors.array().length > 0){
        res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    next()
}

//validate sign in