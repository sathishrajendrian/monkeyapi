const express = require("express");
const router = express.Router();
const { addFoodVendor, allFoodVendor } = require("../controllers/foodVendor");

router.post("/add", addFoodVendor);
router.post("/all", allFoodVendor);

module.exports = router;
