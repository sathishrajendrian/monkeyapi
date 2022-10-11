const mongoose = require("mongoose");

const foodCategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});
foodCategorySchema.set("timestamps", true);

module.exports = mongoose.model(
  "foodCategory",
  foodCategorySchema,
  "foodCategory",
);
