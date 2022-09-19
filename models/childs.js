const mongoose = require("mongoose");

const childSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  class: {
    type: String,
  },
  section: {
    type: String,
  },
  dob: {
    type: Date,
  },
});
childSchema.set("timestamps", true);

module.exports = mongoose.model("Child", childSchema, "childs");
