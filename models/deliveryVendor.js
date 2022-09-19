const mongoose = require("mongoose");

const deliveryVendorSchema = mongoose.Schema({
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
deliveryVendorSchema.set("timestamps", true);

module.exports = mongoose.model(
  "DeliveryVendor",
  deliveryVendorSchema,
  "deliveryVendors",
);
