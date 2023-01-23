const UserModel = require('../../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Sign up an Admin 
module.exports.postSignUp = async (req, res, next)=>{
    const {username, email, password} = req.body
    
    try{
        const user  = UserModel.findOne({email})
        .exec((error, user) =>{
            if(user) return res.status(404).json({
                message: `admin already registerd`
            })
            const createdUser = new UserModel ({
                username,
                email,
                password,
                username: Math.random().toString(),
                role: `admin`
            })

            createdUser.save((error, data)=> {
                if(error){
                    return res.status(400).json({
                        message: `something wrong happened ${error}`
                    })
                }
                if(data){
                    return res.status(201).json({
                        succes: true,
                        message: data
                    })
                }
            })
        })
    }
    catch (err){
        console.log(err);
        res.status(404).json({
            message: err
        })
    }

}

// sign in 
module.exports.postSignIn = async (req, res, next)=>{
    const {email, password} = req.body
    try{
        if (!email){
            res.status(400).json({
                message: "all feild are required"
            })
        }
        if (!password){
            res.status(400).json({
                message: "all feilds are required"
            })
        }
        const foundUser = await UserModel.findOne({email}).exec()

        // check if the user dosent exisit in the DB
        if (!foundUser){
                res.status(401).json({
                    message: "invalid email or password"
                })
        }
        // compare the password and see if its Valid
        const isAuth = await bcryptjs.compare(password, foundUser.password)

        if (!isAuth) return res.status(401).json({message: "invalid email or password"})

        // Create Acces Token 
        const accessToken  = jwt.sign (
            {
                Userinfo: {
                    username: foundUser.username,
                    role: foundUser.role
                }
            },
            process.env.JWT_ACCESS_TOKEN_KEY,
            {expiresIn: `10s`}
        )
        // Create Refresh Token
        const refreshToken = jwt.sign (
            {
                Userinfo: {
                    username: foundUser.username,
                }
            },
            process.env.JWT_REFRESH_TOKEN_KEY,
            {expiresIn: `1d`}
        )
        // set Secure http Cookie that have RrefreshToken
        res.cookie('jwt',
            refreshToken, {
            // secure: true,
            sameSite:'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
            res.json({accessToken})
            return 

    } catch  (err){
        console.log((err));
    }
}



