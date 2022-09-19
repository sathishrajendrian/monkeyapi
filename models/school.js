const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});
schoolSchema.set("timestamps", true);

module.exports = mongoose.model("School", schoolSchema, "schools");
