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
    let existingRef = await paymentModel.findOne({ referenceId: refId });
    if (!existingRef) {
      return res.json({
        status: "error",
        message: "There is no payment found in this reference Id",
      });
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
      error: error.message,
    });
  }
});

//search vendor  not completed
router.post("/search", async (req, res) => {
  try {
    let name = req.body.s;
    let shopId = req.body.shopId;
    let shopData = await shopModel.findOne({ shopId: shopId });
    let data = await vendorModel.findOne({ firstName: name });
    return res.status(200).json({
      status: "success",
      data: data,
      shopData:shopData
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
router.post("/total", async (req, res) => {
  try {
    let data = await vendorModel.find();
    let total;
    total = data.map((data) => data.totalAsset);
    const sum = total.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return res.status(200).json({
      status: "success",
      total: sum,
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

//total rent
router.post("/totalRent", async (req, res) => {
  try {
    let data = await vendorModel.find();
    let total;
    total = data.map((data) => data.shopRent);
    const sum = total.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return res.status(200).json({
      status: "success",
      total: sum,
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


//total deposite
router.post("/totalDeposite", async (req, res) => {
  try {
    let data = await vendorModel.find();
    let total;
    total = data.map((data) => data.depositeAmount);
    const sum = total.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return res.status(200).json({
      status: "success",
      total: sum,
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

//view all vendors
router.get("/viewall",async(req,res)=>{
  try {
    let data=await vendorModel.find()
    return res.json({
      data:data
    })
  } catch (error) {
    console.error(error)
  }
})

//view shop numbers
router.post("/number", async (req, res) => {
  try {
    let shop = await vendorModel.find();
    let totalShops = shop.length;
    return res.json({
      status: "success",
      totalShops: totalShops,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      message: "internal server",
    });
  }
});



module.exports = router;
