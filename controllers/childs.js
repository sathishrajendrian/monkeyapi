const { v4: uuid4 } = require("uuid");
const { successMsg, failureMsg, printError } = require("../utils");
const mongoose = require("mongoose");

const Child = require("../models/childs");
const User = require("../models/user");
const School = require("../models/school");

const addChild = async (req, res) => {
  if (!req.body.name) {
    failureMsg(res, "name is required");
    return;
  }
  if (!req.body.userId) {
    failureMsg(res, "userId is required");
    return;
  }
  if (!req.body.schoolId) {
    failureMsg(res, "schoolId is required");
    return;
  }
  // Check user exists
  const user = await User.findOne({
    userId: req.body.userId,
  });
  if (!user) {
    failureMsg(res, "User not found");
    return;
  }
  //Check user exists

  // Check school exists
  const school = await School.findOne(
    {
      schoolId: req.body.schoolId,
    },
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
  );
  if (!school) {
    failureMsg(res, "School not found");
    return;
  }
  //Check school exists

  // Check child exists
  const child = await Child.findOne(
    {
      userId: req.body.userId,
      name: req.body.name,
    },
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
  );

  if (child) {
    failureMsg(res, "Child already exists");
    return;
  }
  //Check child exists

  //Saving Child
  try {
    const newChild = new Child({
      id: uuid4(),
      childId: uuid4(),
      name: req.body.name,
      userId: req.body.userId,
      schoolId: req.body.schoolId,
      class: req.body.class,
      section: req.body.section,
      dob: req.body.dob,
    });
    await newChild.save();
    successMsg(res, "Child added Successfully");
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};
const getByUser = async (req, res) => {
  if (!req.body.userId) {
    failureMsg(res, "userId is required");
    return;
  }
  let findResult = [];
  findResult = await Child.find(
    {
      userId: req.body.userId,
    },
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
  );
  const resArray = [];
  for (const child of findResult) {
    const school = await School.findOne({
      schoolId: child.schoolId,
    }).select("schoolName");
    child.set("schoolName", school ? school.schoolName : "", { strict: false });

    resArray.push(child);
  }
  successMsg(res, resArray);
  return;
};
module.exports = {
  addChild,
  getByUser,
};
