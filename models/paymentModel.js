const mongoose = require("mongoose");

const paymentModel = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  referenceId: { 
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("payments", paymentModel);
