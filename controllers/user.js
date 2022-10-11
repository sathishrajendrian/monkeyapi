const { v4: uuid4 } = require("uuid");
const {
  successMsg,
  failureMsg,
  printError,
  encryptText,
  decryptText,
} = require("../utils");

const User = require("../models/user");
const login = async (req, res) => {
  if (!req.body.phoneNo) {
    res.send(failureMsg(res, "phoneNo is required"));
    return;
  }
  if (!req.body.password) {
    res.send(failureMsg(res, "password is required"));
    return;
  }
  try {
    const user = await User.findOne(
      {
        phoneNo: req.body.phoneNo.toLowerCase(),
      },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
    );
    if (user) {
      if ((await decryptText(req.body.password, user.password)) === true) {
        user.password = undefined;
        successMsg(res, user);
      } else {
        failureMsg(res, "Invalid credentials");
      }
    } else {
      failureMsg(res, "User not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const register = async (req, res) => {
  if (!req.body.firstName) {
    res.send(failureMsg(res, "firstName is required"));
    return;
  }
  if (!req.body.email) {
    res.send(failureMsg(res, "email is required"));
    return;
  }
  if (!req.body.phoneNo) {
    res.send(failureMsg(res, "phoneNo is required"));
    return;
  }
  if (!req.body.password) {
    res.send(failureMsg(res, "password is required"));
    return;
  }
  const userWithPhone = await findUserByPhoneNo(req.body.phoneNo);
  if (userWithPhone) {
    res.send(failureMsg(res, "user already exixts"));
    return;
  }

  try {
    const newUser = new User({
      id: uuid4(),
      userId: uuid4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      password: encryptText(req.body.password),
      status: req.body.status ? Boolean(req.body.status) : true,
    });
    await newUser.save();
    try {
      const user = await User.findOne(
        {
          phoneNo: req.body.phoneNo.toLowerCase(),
        },
        { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
      );
      if (user) {
        if ((await decryptText(req.body.password, user.password)) === true) {
          user.password = undefined;
          successMsg(res, user);
        } else {
          failureMsg(res, "Invalid credentials");
        }
      } else {
        failureMsg(res, "User not found");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};
async function findUserByPhoneNo(phoneNo) {
  try {
    return User.findOne({ phoneNo: phoneNo.toLowerCase() });
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
}

module.exports = {
  login,
  register,
};
