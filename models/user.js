const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});
userSchema.set("timestamps", true);

module.exports = mongoose.model("User", userSchema, "users");
