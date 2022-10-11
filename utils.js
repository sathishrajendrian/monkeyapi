const { v4: uuid4 } = require("uuid");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateId = () => {
  return uuidv4();
};

const successMsg = (res, msg) => {
  const success = {
    success: true,
    data: msg,
  };
  res.status(200).json(success);
  return;
};

const failureMsg = (res, msg) => {
  const error = {
    success: false,
    data: `${msg}`,
  };
  res.status(400).json(error);
  return;
};
const printError = (err) => {
  console.log(JSON.stringify(err));
};

const encryptText = (str) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(str, salt);
  return hash;
};

const decryptText = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};

module.exports = {
  successMsg,
  failureMsg,
  printError,
  encryptText,
  decryptText,
  generateId,
};
