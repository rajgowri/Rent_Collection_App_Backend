const express = require("express");
const paymentModel = require("../models/paymentModel");

const router = express.Router();

//add payment success
router.post("/add", async (req, res) => {
  try {
    let input = req.body;
    let newPayment = new paymentModel(input);
    await newPayment.save();
    return res.json({
      status: "success",
      message: "successfully added new payment",
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

//view all payment success
router.get("/viewall", async (req, res) => {
  try {
    let data = await paymentModel.find();
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

//search payment success
router.post("/search", async (req, res) => {
  try {
    let category = req.body.category;
    let method = req.body.method;
    let data = await paymentModel.find({ category: category, method: method });
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
module.exports = router;
