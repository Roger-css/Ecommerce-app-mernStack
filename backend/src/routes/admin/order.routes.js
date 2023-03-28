const express = require("express");
const {
    updateOrder,
    getCustomerOrders,
} = require("../../controllers/admin/order.admin");
const router = express.Router();

router.post(`/order/update`, updateOrder);
router.post(
    `/order/getCustomerOrders`,
    getCustomerOrders
);

module.exports = router;