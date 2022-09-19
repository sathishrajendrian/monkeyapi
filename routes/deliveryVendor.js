const express = require("express");
const router = express.Router();
const {
  addDeliveryVendor,
  allDeliveryVendor,
} = require("../controllers/deliveryVendor");

router.post("/add", addDeliveryVendor);
router.post("/all", allDeliveryVendor);

module.exports = router;
