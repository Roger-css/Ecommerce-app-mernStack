const checkAdmin = (req, res, next) => {
    try {
            console.log(`admin middlewareworked ${req.role}`);
            if (req.role === "admin"){
                next()
            }else {
                return res.status(401).json({message : `"Unauthorized from admin"`})
            }
    } catch (error) {
        return res.status(401).json("Unauthorized")
    }
}
module.exports =  checkAdmin