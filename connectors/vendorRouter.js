const express = require("express");
const vendorModel = require("../models/vendorModel");
const paymentModel = require("../models/paymentModel");
const shopModel = require("../models/shopModel");

const router = express.Router();

//add vendor
router.post("/add", async (req, res) => {
  try {
    let input = req.body;
    let refId = input.paymentReferenceId;
    let shopId = input.shopId;
    let existShopId = await shopModel.findOne({ shopId: shopId });
    if (!existShopId) {
      return res.json({
        status: "error",
        message: "shop Id Does not exists",
      });
    }
    let existRef = await paymentModel.findOne({ referenceId: refId });
    if (!existRef) {
      return res.json({
        status: "error",
        message: "check your payemnt reference Id",
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

//search vendor
router.post("/search", async (req, res) => {
  try {
    let category = req.body.category;
    let data = await vendorModel.findOne({
      "paymentReferenceId.category": category,
    });
    if (!data) {
      return res.json({
        status: "error",
        message: "no data found",
      });
    }
    return res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      message: "internal server error",
      error: error.message,
    });
  }
});

router.get("/view", async (req, res) => {
  let data = await vendorModel.find().populate("paymentReferenceId").exec();
  return res.json(data);
});
module.exports = router;
