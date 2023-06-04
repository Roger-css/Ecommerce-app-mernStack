const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const UserModel = require("./models/User.js");
const userRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const adminInitialData = require("./routes/admin/initailData");
const CategoryRoutes = require("./routes/category");
const adminProductRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initailData");
const adminPageRoute = require("./routes/admin/page");
const AddressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const AdminOrderRoutes = require("./routes/admin/order.routes");
const path = require("path");

const refreshRoot = require("./routes/refresh");

const app = express();
const port = 3000;
const DB_URI = `mongodb+srv://rayhons:fuckwolf@cluster0.vns9wl6.mongodb.net/?retryWrites=true&w=majority`;

// app config
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

require("dotenv").config();

mongoose.set("strictQuery", false);
app.use(cookieParser());

// set routes from here
app.use(cors({ credentials: true, origin: true }));

express.static.mime.define({
  "image/avif": ["avif"],
});

app.use(express.static(path.join(__dirname, "public")));

//admin routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminInitialData);
app.use("/api/page", adminPageRoute);

// combined routes
app.use("/api", userRoutes);
app.use("/api", refreshRoot);
app.use("/api/category", CategoryRoutes);
app.use("/api/product", adminProductRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", AddressRoutes);
app.use("/api", orderRoutes);
app.use("/api", AdminOrderRoutes);

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`app is listening on port  ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
