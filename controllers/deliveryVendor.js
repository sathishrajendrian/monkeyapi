const { v4: uuid4 } = require("uuid");
const { successMsg, failureMsg, printError } = require("../utils");

const DeliveryVendor = require("../models/deliveryVendor");

const addDeliveryVendor = async (req, res) => {
  if (!req.body.name) {
    failureMsg(res, "name is required");
    return;
  }

  // Check child exists
  const deliveryVendor = await DeliveryVendor.findOne(
    {
      name: req.body.name,
    },
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
  );

  if (deliveryVendor) {
    failureMsg(res, "Delivery Vendor already exists");
    return;
  }
  //Check child exists

  //Saving Child
  try {
    const newChild = new DeliveryVendor({
      id: uuid4(),
      name: req.body.name,
      address: req.body.address,
    });
    await newChild.save();
    successMsg(res, "Delivery Vendor added Successfully");
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};

const allDeliveryVendor = async (req, res) => {
  const deliveryVendors = await DeliveryVendor.find(
    {
      userId: req.body.userId,
    },
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
  );
  successMsg(res, deliveryVendors);
  return;
};
module.exports = {
  addDeliveryVendor,
  allDeliveryVendor,
};
