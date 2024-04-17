const mongoose = require("mongoose");

const vendorModel = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  temporaryAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  selectedState: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  emergencyContactNumber: {
    type: String,
    required: true,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
    required: true,
  },
  totalAsset: {
    type: Number,
    required: true,
  },
  assetList: [
    {
      type: String,
      required: true,
    },
  ],
  depositeAmount: {
    type: Number,
    required: true,
  },
  assetRentAmount: {
    type: Number,
    required: true,
  },
  selectedPayment: {
    type: String,
    required: true,
  },
  paymentReferenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "payments",
  },
  leaseStartDate: {
    type: Date,
    required: true,
  },
  leaseEndDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("vendors", vendorModel);
