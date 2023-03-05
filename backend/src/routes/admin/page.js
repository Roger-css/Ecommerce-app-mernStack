const express = require("express");
const verifyJWT = require("../../middleware/VerifyJwt");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const PageController = require("../../controllers/admin/page")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(path.dirname(__dirname)), `public/uploads/`));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router
  .route("/create")
  .post(
    // verifyJWT,
    upload.fields([
      {name: "banners"},
      {name: "products"}
    ]),
    PageController.createPage
  );
router
    .route("/:category/:type")
    .get(PageController.getPage)

module.exports = router;
