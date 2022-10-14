const mongoose = require("mongoose");

const foodItemSchema = mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
  },
  foodItemId: {
    type: String,
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  mrp: {
    type: String,
  },
  sellPrice: {
    type: String,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  availablity: {
    type: [Number],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  foodType: {
    type: String,
  },
  id: {
    type: String,
  },
});
foodItemSchema.set("timestamps", true);

module.exports = mongoose.model("foodItem", foodItemSchema, "foodItem");
