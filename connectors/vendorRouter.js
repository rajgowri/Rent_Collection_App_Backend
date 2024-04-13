const express = require("express");
const vendorModel = require("../models/vendorModel");
const paymentModel = require("../models/paymentModel");

const router = express.Router();

//add vendor
router.post("/add", async (req, res) => {
  try {
    let input = req.body;
    let refId = input.paymentReferenceId;
    let existRef = await paymentModel.findOne({ referenceId: refId });
    if (!existRef) {
      return res.json({
        status: "error",
        message: "check your reference Id",
      });
    }
    let newVendor = new vendorModel(input);
    await newVendor.save();
    return res.json({
      status: "success",
      message: "successfully added vendor",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      message: "internal sever error",
    });
  }
});
module.exports = router;
