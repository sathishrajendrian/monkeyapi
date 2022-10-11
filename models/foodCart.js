const mongoose = require("mongoose");

const foodCartSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  foodItemId: {
    type: String,
    required: true,
  },
  cartId: {
    type: String,
  },
  id: {
    type: String,
  },
  qty: {
    type: String,
    required: true,
  },
});
foodCartSchema.set("timestamps", true);

module.exports = mongoose.model("foodCart", foodCartSchema, "foodCart");
