const mongoose = require("mongoose");

const shopModel = new mongoose.Schema({
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
