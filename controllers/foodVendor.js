const { v4: uuid4 } = require("uuid");
const { successMsg, failureMsg, printError } = require("../utils");

const FoodVendor = require("../models/foodVendor");

const addFoodVendor = async (req, res) => {
  if (!req.body.name) {
    failureMsg(res, "name is required");
    return;
  }

  // Check child exists
  const foodVendor = await FoodVendor.findOne(
    {
      name: req.body.name,
    },
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
  );

  if (foodVendor) {
    failureMsg(res, "Food Vendor already exists");
    return;
  }
  //Check child exists

  //Saving Child
  try {
    const newChild = new FoodVendor({
      id: uuid4(),
      name: req.body.name,
      address: req.body.address,
    });
    await newChild.save();
    successMsg(res, "Food Vendor added Successfully");
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};

const allFoodVendor = async (req, res) => {
  const foodVendors = await FoodVendor.find(
    {
      userId: req.body.userId,
    },
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
  );
  successMsg(res, foodVendors);
  return;
};
module.exports = {
  addFoodVendor,
  allFoodVendor,
};
