const refreshToken = (req, res, next) => {
    const cookies = req.cookies
    if (!cookies.jwt) return res.status(401).json({message: `Unauthorized`})

    const  refreshToken = cookies.jwt
    //  verify the refrsh token 
    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_KEY,
            async (err, decode) => {
                if (err) return res.json(403).json({message: `Forbidden`})
                const foundUser = await UserModel.findOne({username: decode.username})
                if (!foundUser) return res.status(401).json({message: `Unauthorized`})

                const accessToken = jwt.sign(
                    {
                        Userinfo: {
                            username: foundUser.username,
                            roles: foundUser.role
                        }
                    },
                    process.env.JWT_ACCESS_TOKEN_KEY,
                    {expiresIn: `10s`}
                )
                req.apiToken = accessToken
                next()
        })
}

module.exports = refreshToken