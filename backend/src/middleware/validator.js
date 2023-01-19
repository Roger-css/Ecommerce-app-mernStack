const expressValidator = require('express-validator');
const {check, validationResult } = require('express-validator')

// this fiel to vlidate sign in and up 
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
// validate sign in

exports.validateSignIn = [
    check("email")
        .isLength({min: 0})
        .withMessage(`Email required`)
        .isEmail()
        .withMessage('should be Email'),
    check('password')
        .isLength({min: 8})
        .withMessage('password length should be more than 6 chracters')    
]
// validate result 
exports.validateResult = (req, res, next)=> {
    const errors = validationResult(req)
    if(errors.array().length > 0){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    next()
}
