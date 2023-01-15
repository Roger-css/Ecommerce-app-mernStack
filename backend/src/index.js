const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserModel = require('./models/User.js');
const userRoutes = require('./routes/auth');



console.log(UserModel)
const app = express()
const port = 3000
const DB_URI = `mongodb+srv://rayhons:fuckwolf@cluster0.vns9wl6.mongodb.net/?retryWrites=true&w=majority`


app.use(cookieParser())

// app config
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
require("dotenv").config()

mongoose.set('strictQuery', false)

// set routes from here
app.use("/api", userRoutes)



mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
}).then(()=> {
    app.listen(port, ()=> {
        console.log(`app is listenign on port  ${port}`);
    })
}).catch((err)=> {
    console.log(err);
})


