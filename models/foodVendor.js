const mongoose = require("mongoose");

const foodVendorSchema = mongoose.Schema({
  foodVendorId: {
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
foodVendorSchema.set("timestamps", true);

module.exports = mongoose.model("FoodVendor", foodVendorSchema, "foodVendor");
