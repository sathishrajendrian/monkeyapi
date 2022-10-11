const { v4: uuid4 } = require("uuid");
const { successMsg, failureMsg, printError } = require("../utils");

const FoodCategory = require("../models/foodCategory");
const FoodItem = require("../models/FoodItem");
const FoodCart = require("../models/foodCart");
const addCategory = async (req, res) => {
  if (!req.body.categoryName) {
    failureMsg(res, "categoryName is required");
    return;
  }

  // Check child exists
  const foodCategory = await FoodCategory.findOne(
    {
      categoryName: req.body.categoryName,
    },
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
  );

  if (foodCategory) {
    failureMsg(res, "Food Category already exists");
    return;
  }
  //Check child exists

  //Saving Child
  try {
    const newChild = new FoodCategory({
      categoryId: uuid4(),
      categoryName: req.body.categoryName,
      status: req.body.status,
    });
    await newChild.save();
    successMsg(res, "Food Category added Successfully");
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};

const addFoodItem = async (req, res) => {
  if (!req.body.categoryId) {
    failureMsg(res, "categoryId is required");
    return;
  }
  if (!req.body.foodName) {
    failureMsg(res, "foodName is required");
    return;
  }

  // Check child exists
  const existCheck = await FoodItem.findOne(
    {
      foodName: req.body.foodName,
      categoryId: req.body.categoryId,
    },
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
  );

  if (existCheck) {
    failureMsg(res, "Food Item already exists");
    return;
  }
  //Check child exists

  //Saving Child
  try {
    const newChild = new FoodItem({
      categoryId: req.body.categoryId,
      foodName: req.body.foodName,
      status: req.body.status,
      mrp: req.body.mrp,
      sellPrice: req.body.sellPrice,
      inStock: req.body.inStock,
      availablity: req.body.availablity,
      image: req.body.image,
      foodItemId: uuid4(),
    });
    await newChild.save();
    successMsg(res, "Food Item added Successfully");
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};

const getallFoodItem = async (req, res) => {
  const categoryId = req.body.categoryId;
  let foodCategorys = [];
  let foodItems = [];

  if (categoryId) {
    foodCategorys = await FoodCategory.find(
      { categoryId },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
    );
    foodItems = await FoodItem.find(
      { categoryId },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
    );
  } else {
    foodCategorys = await FoodCategory.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
    );
    foodItems = await FoodItem.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
    );
  }
  foodItems = foodItems.map(function (item) {
    item.set("currentDate", new Date().getDay(), { strict: false });
    item.set("qty", Math.floor(Math.random() * 6) + 1, { strict: false });

    return item;
  });
  const resArray = [];
  for (const cat of foodCategorys) {
    resArray.push({
      categoryId: cat.categoryId,
      categoryName: cat.categoryName,
      foodItems: foodItems.filter((x) => x.categoryId === cat.categoryId),
    });
  }

  successMsg(res, resArray);
};

const updateFoodItem = async (req, res) => {
  if (!req.body.foodItemId) {
    failureMsg(res, "foodItemId is required");
    return;
  }
  if (!req.body.categoryId) {
    failureMsg(res, "categoryId is required");
    return;
  }
  if (!req.body.foodName) {
    failureMsg(res, "foodName is required");
    return;
  }

  // Check child exists
  const existCheck = await FoodItem.find()
    .where("categoryId")
    .eq(req.body.categoryId)
    .where("foodItemId")
    .ne(req.body.foodItemId)
    .where("foodName")
    .eq(req.body.foodName);
  if (existCheck.length > 0) {
    failureMsg(res, "Food Item already exists in this Category");
    return;
  } else {
    var query = { foodItemId: req.body.foodItemId };
    await FoodItem.findOneAndUpdate(query, req.body, { upsert: true });
    successMsg(res, "Food Item updated successfully");
  }
};

const addtoCart = async (req, res) => {
  const existCheck = await FoodCart.findOne()
    .where("foodItemId")
    .eq(req.body.foodItemId)
    .where("userId")
    .eq(req.body.userId);
  if (existCheck) {
    if (parseFloat(req.body.qty) === 0) {
      // Delete
      FoodCart.remove({ cartId: existCheck.cartId }, function (err) {
        if (err) throw err;
      });
      successMsg(res, "deleted Successfully");
      return;
    }
    existCheck.qty = 20;
    var query = { cartId: existCheck.cartId };
    await FoodCart.findOneAndUpdate(query, existCheck, { upsert: true });
    successMsg(res, "updated Successfully");
  } else {
    if (parseFloat(req.body.qty) === 0) {
      failureMsg(res, "qty should not be 0");
      return;
    }
    try {
      const newChild = new FoodCart({
        userId: req.body.userId,
        foodItemId: req.body.foodItemId,
        cartId: uuid4(),
        id: uuid4(),
        qty: req.body.qty,
      });
      await newChild.save();
      successMsg(res, "added Successfully");
    } catch (error) {
      printError(error);
      failureMsg(res, "Something went wrong");
    }
  }
};
module.exports = {
  addCategory,
  addFoodItem,
  getallFoodItem,
  updateFoodItem,
  addtoCart,
};
