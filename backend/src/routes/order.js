const { addOrder, getOrders, getOrder } = require("../controllers/order");
const router = require("express").Router();
const verifyJWT = require(`../middleware/VerifyJwt`);

router.post("/addOrder", verifyJWT, addOrder);
router.get("/getOrders", verifyJWT, getOrders);
router.post("/getOrder", verifyJWT, getOrder);

module.exports = router;
