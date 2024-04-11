const mongoose = require("mongoose");

const shopModel = new mongoose.Schema({
  shopId: {
    type: String,
    required: true,
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
module.exports = mongoose.model("shops", shopModel);
