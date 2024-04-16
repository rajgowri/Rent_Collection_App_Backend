const express = require("express");
const shopModel = require("../models/shopModel");

const router = express.Router();

//add shop
router.post("/add", async (req, res) => {
  try {
    let input = req.body;
    let shopId = input.shopId;
    let existingShop = await shopModel.findOne({ shopId: shopId });
    if (existingShop) {
      return res.json({
        status: "error",
        message: "shop id is alredy in use",
      });
    }
    let newShop = new shopModel(input);
    await newShop.save();
    return res.json({
      status: "success",
      message: "successfully created shop",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      message: "internal server error",
    });
  }
});

//view all shops
router.get("/viewall", async (req, res) => {
  try {
    let data = await shopModel.find();
    return res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      message: "internal server error",
    });
  }
});

//delete shop
router.delete("/delete", async (req, res) => {
  try {
    let id = req.body.shopId;
    let data = await shopModel.findOneAndDelete({ shopId: id });
    if (!data) {
      return res.json({
        status: "error",
        message: "can not find shop",
      });
    }
    return res.json({
      status: "success",
      message: "successfully deleted shop",
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

module.exports = router;
