const express = require("express");
const router = express.Router();
const {
  addCategory,
  addFoodItem,
  getallFoodItem,
  updateFoodItem,
  addtoCart,
  getCartItems,
} = require("../controllers/foodItems");

router.post("/addCategory", addCategory);
router.post("/addFoodItem", addFoodItem);
router.post("/getallFoodItem", getallFoodItem);
router.post("/updateFoodItem", updateFoodItem);
router.post("/getCartItems", getCartItems);

router.post("/addtoCart", addtoCart);
module.exports = router;
