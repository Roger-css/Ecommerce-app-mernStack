const express = require("express");
const authController = require("../controllers/auth");
const verifyJWT = require("../middleware/VerifyJwt");
const router = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

router.use(cookieParser());

router.route("/refresh").get((req, res, next) => {
  const jwtcookie = req.cookies.jwt;
  if (!jwtcookie) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(
    jwtcookie,
    process.env.JWT_REFRESH_TOKEN_KEY,
    async (err, decode) => {
      if (err) return res.status(403).json({ message: err });
      console.log(decode.Userinfo.username);
      const foundUser = await UserModel.findOne({
        username: decode.Userinfo.username,
      });
      if (!foundUser) return res.status(401).json({ message: `Unauthorized ` });
      // this line should be moved
      const accessToken = jwt.sign(
        {
          Userinfo: {
            username: foundUser.username,
            roles: foundUser.role,
            id: foundUser._id,
          },
        },
        process.env.JWT_ACCESS_TOKEN_KEY,
        { expiresIn: `1m` }
      );
      return res.status(201).json({ accessToken, email: foundUser.email });
    }
  );
});

module.exports = router;
