const checkAdmin = (req, res, next) => {
    try {
            console.log(req.id);
            console.log("end of admin");
            if (req.role == "admin"){
                next()
            }else {
                return res.status(401).json({message : `"Unauthorized from admin"`})
            }
    } catch (error) {
        console.log("error from amdi ncghecker");
        return res.status(401).json("Unauthorized")
    }
}
module.exports =  checkAdmin