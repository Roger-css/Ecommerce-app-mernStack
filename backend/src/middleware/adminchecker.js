const checkAdmin = (req, res, next) => {
    try {
            if (req.role === "admin"){
                next()
            }else {
                return res.status(401).json("Unauthorized")
            }
    } catch (error) {
        return res.status(401).json("Unauthorized")
    }
}
module.exports =  checkAdmin