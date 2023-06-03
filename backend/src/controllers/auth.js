const express = require("express");
const UserModel = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.postSignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (user)
      return res.status(402).json({
        message: `email already used`,
      });
    const createdUser = new UserModel({
      username,
      email,
      password,
    });
    createdUser.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: `something wrong happened ${error}`,
        });
      }
      if (data) {
        return res.status(201).json({
          message: data,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err,
    });
  }
};

// Sign In
module.exports.postSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      res.status(400).json({
        message: "all feild are required",
      });
    }
    if (!password) {
      res.status(400).json({
        message: "all feilds are required",
      });
    }
    const foundUser = await UserModel.findOne({ email }).exec();

    // check if the user dosent exisit in the DB
    if (!foundUser) {
      res.status(401).json({
        message: "invalid email or password",
      });
    }
    // compare the password and see if its Valid
    const isAuth = await bcryptjs.compare(password, foundUser.password);

    if (!isAuth)
      return res.status(401).json({ message: "invalid email or password" });

    // Create Acces Token
    const accessToken = jwt.sign(
      {
        Userinfo: {
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
          id: foundUser._id,
        },
      },
      process.env.JWT_ACCESS_TOKEN_KEY,
      { expiresIn: `1m` }
    );
    // Create Refresh Token
    const refreshToken = jwt.sign(
      {
        Userinfo: {
          username: foundUser.username,
          role: foundUser.role,
          id: foundUser._id,
        },
      },
      process.env.JWT_REFRESH_TOKEN_KEY,
      { expiresIn: `1d` }
    );
    // set Secure http Cookie that have RrefreshToken
    res.cookie("jwt", refreshToken, {
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 60 * 60 * 60 * 1000,
    });
    res.status(201).json(accessToken);
  } catch (err) {
    console.log(err);
  }
};
// END Sign In

// start of sign-out
module.exports.postSignOut = async (req, res, next) => {
  res.cookie("jwt", " ", { maxAge: -9999 });
  res.status(200).json({ message: "deleted succesfully" });
};
