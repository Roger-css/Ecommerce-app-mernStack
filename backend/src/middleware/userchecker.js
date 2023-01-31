const UserChecker = (req, res, next) => {
        try {
            if (req.role === "admin"){
                next()
            }else {
                return res.status(401).json({message : "Unauthorized"})
            }

        } catch (error) {
            return res.status(401).json({message : "Unauthorized"})
        }
}

module.exports = UserChecker