const express = require('express');
const { placeOrder, verifyOrder, myOrders, allorders, updateStatus } = require('../controller/orderController');
const isLoggedin = require('../middlewares/isLoggedin');
const router = express.Router();



router.route('/place').post(isLoggedin,placeOrder)
router.route('/verify').post(verifyOrder)
router.route("/myorders").post(isLoggedin, myOrders);
router.route("/allorders").get(allorders);
router.route("/status").post(updateStatus)


module.exports = router