const express = require("express");
const authController = require("../controllers/auth");
const categoryController = require("../controllers/category");
const categoryModel = require("../models/category");
const verifyJWT = require("../middleware/VerifyJwt");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), `public/uploads/`));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + file.originalname);
  },
});
const upload = multer({ storage: storage });


router
  .route("/create")
  .post(upload.single("categoryImage"),
    verifyJWT,
    categoryController.addCategory);
// get ALL CAtegories
router.route("/get").get(categoryController.getCategories);

// Update Category/ies 
router.route("/update").post(upload.array("categoryImages"), categoryController.updateCategory)

module.exports = router;
