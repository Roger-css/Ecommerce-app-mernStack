const { addOrder, getOrders, getOrder } = require("../controllers/order");
const router = require("express").Router();

router.post("/addOrder",  addOrder);
router.get("/getOrders",  getOrders);
router.post("/getOrder",  getOrder);

module.exports = router;