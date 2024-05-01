const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  shopId: {
    type: String,
    required: true,
    unique: true,
  },
  
});


module.exports = mongoose.model("Shop", shopSchema);
