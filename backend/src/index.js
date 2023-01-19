const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserModel = require('./models/User.js');
const userRoutes = require('./routes/auth');
const adminRoutes = require("./routes/admin/auth")
const adminCategoryRoutes = require("./routes/admin/category")
const adminProductRoutes = require("./routes/admin/product")



const app = express()
const port = 3000
const DB_URI = `mongodb+srv://rayhons:fuckwolf@cluster0.vns9wl6.mongodb.net/?retryWrites=true&w=majority`


app.use(cookieParser())

// app config
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

require("dotenv").config()

mongoose.set('strictQuery', false)

// set routes from here
app.use(cors())

app.use("/api", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/admin/category", adminCategoryRoutes)
app.use("/api/admin/product", adminProductRoutes)


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


