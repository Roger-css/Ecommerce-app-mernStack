const express = require("express");
const authController = require("../controllers/auth");
const verifyJWT = require("../middleware/VerifyJwt");
const router = express.Router();
const cookieParser = require("cookie-Parser");
const JWT = require("jsonwebtoken");
const UserModel = require("../models/User");

router.use(cookieParser());
router.route("/refresh").get((req, res, next) => {
  const jwt = req.cookies.jwt;
  if (!jwt) return res.status(401).json({ message: "Unauthorized" });
  JWT.verify(jwt, process.env.JWT_REFRESH_TOKEN_KEY, async (err, decode) => {
    if (err) return res.status(403).json({ message: "unauthorized" });
    const foundUser = await UserModel.findOne({
      username: decode.Userinfo.username,
    });
    if (!foundUser) return res.status(401).json({ message: `Unauthorized ` });
    // this line shoube be moved
    const accessToken = jwt.sign(
      {
        Userinfo: {
          username: foundUser.username,
          roles: foundUser.role,
        },
      },
      process.env.JWT_ACCESS_TOKEN_KEY,
      { expiresIn: `1m` }
    );
    return res.status(201).json({ accessToken });
  });
});

module.exports = router;
