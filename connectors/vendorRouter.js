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
    let existShopId = await shopModel.findById(shopId);
    if (!existShopId) {
      return res.json({
        status: "error",
        message: "shop Id Does not exists",
      });
    }
    let existingRef = await paymentModel.findOne({ referenceId: refId });
    if(!existingRef){
      return res.json({
        status:"error",
        message:"There is no payment found in this reference Id"
      })
    }
    let newVendor = new vendorModel(input);
    await newVendor.save();
    return res.status(200).json({
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


//search vendor  not completed
router.post("/search", async (req, res) => {
  try {
    let category = req.body.category;
    let data = await vendorModel.findOne({
      "paymentReferenceId.category": category,
    });
    if (!data) {
      return res.json({
        status: "error",
        message: "No data found",
      });
    }
    return res.status(200).json({
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

//total vendor asset find
router.post("/total",async(req,res)=>{
  try {
    let data=await vendorModel.find()
    let total
    total=data.map(data=>data.totalAsset)
    const sum = total.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return res.status(200).json({
      status: "success",
      total: sum,
    });
  } catch (error) {
    console.error(error)
    return res.json({
      status:"error",
      message:"internal server error",
      error:error.message
    })
  }
})

module.exports = router;
