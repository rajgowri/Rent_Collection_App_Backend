const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  shopId: {
    type: String,
    required: true,
    unique: true,
  },
  shopAddress: {
    type: String,
    required: true,
  },
  shopRent: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Shop", shopSchema);
