const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const verifyJWT = (req , res, next )=> {
        // Check if there is a access token first 
        const authHeader = req.headers.authorization 
        if (!authHeader)
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message: "Unauthorized"})
        }
        const token = authHeader.split(` `)[1]
        jwt.verify(
            token,
            process.env.JWT_ACCESS_TOKEN_KEY,
            (err, decode) => {
                if(err){
                    if (err.name === "TokenExpiredError"){
                        const cookies = req.cookies
                        console.log(cookies)
                        if (!cookies.jwt) return res.status(401).json({message: `Unauthorized line19`})
                        const  refreshToken = cookies.jwt
                        jwt.verify(
                            refreshToken,
                            process.env.JWT_REFRESH_TOKEN_KEY,
                                async (err, decode) => {
                                    if (err) return res.json(403).json({message: `Forbidden`})
                                    const foundUser = await UserModel.findOne({username: decode.Userinfo.username})
                                    console.log(foundUser);
                                    if (!foundUser) return res.status(401).json({message: `Unauthorized`})
                                    const accessToken = jwt.sign(
                                        {
                                            Userinfo: {
                                                username: foundUser.username,
                                                roles: foundUser.role
                                            }
                                        },
                                        process.env.JWT_ACCESS_TOKEN_KEY,
                                        {expiresIn: `1m`}
                                    )
                                    req.apiToken = accessToken
                                    req.user = foundUser.username 
                                    req.role = foundUser.role 
                                    next()
                            })
                    }
                }
                else if(err){
                    return res.status(401).json({message: "Unauthorized"})
                } else {
                    req.user = decode.Userinfo.username 
                    req.role = decode.Userinfo.role 
                    next()
                } 
                // req.user = decode.username 
                // req.role = decode.role 
                // next()
            }
        )
}


module.exports= verifyJWT