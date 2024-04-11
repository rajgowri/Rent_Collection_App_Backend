const express = require("express");
const shopModel = require("../models/shopModel");

const router = express.Router();

//add shop
router.post("/add", async (req, res) => {
  try {
    let input = req.body;
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

module.exports = router;
