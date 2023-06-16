const express = require("express");
const productController = require("../controllers/product");
const productModel = require("../models/product");
const verifyJWT = require("../middleware/VerifyJwt");
const checkAdmin = require("../middleware/adminchecker");

const path = require("path");
const multer = require("multer");
const shortid = require("shortid");
const router = express.Router();

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
  .post(
    verifyJWT,
    checkAdmin,
    upload.array("productPictures"),
    productController.createProduct
  );
router.route("/get").get(productController.getProducts);

/// start of public roots
router
  .route("/category/:categoryName")
  .get(productController.getProductsByCategory);
router.route("/:productId").get(productController.getProductsById);
/// end of public roots
module.exports = router;
