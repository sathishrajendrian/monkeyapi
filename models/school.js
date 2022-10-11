const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema({
  schoolId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});
schoolSchema.set("timestamps", true);

module.exports = mongoose.model("School", schoolSchema, "schools");
