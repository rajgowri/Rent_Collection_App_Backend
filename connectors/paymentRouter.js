const express = require("express");
const paymentModel = require("../models/paymentModel");

const router = express.Router();

//add payment
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

//view all payment
router.get("/viewall", async (req, res) => {
  try {
    let data = await paymentModel.find();
    return res.statusCode(200).json({
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
