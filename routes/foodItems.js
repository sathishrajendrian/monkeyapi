const express = require("express");
const router = express.Router();
const {
  addCategory,
  addFoodItem,
  getallFoodItem,
  updateFoodItem,
  addtoCart,
  getCartItems,
  getCategory,
} = require("../controllers/foodItems");

router.post("/addCategory", addCategory);
router.post("/getCategory", getCategory);

router.post("/addFoodItem", addFoodItem);
router.post("/getallFoodItem", getallFoodItem);
router.post("/updateFoodItem", updateFoodItem);
router.post("/getCartItems", getCartItems);

router.post("/addtoCart", addtoCart);
module.exports = router;
