const express = require("express");
const vendorModel = require("../models/vendorModel");
const paymentModel = require("../models/paymentModel");
const shopModel = require("../models/shopModel");
const nodemailer = require("nodemailer");

const router = express.Router();


const transporter = nodemailer.createTransport({
  service: "gowriraj2510@gmail.com",
  auth: {
    user: "gowriraj2510@gmail.com", // Your Gmail email address
    pass: "nvdn rebd ibmp ejif", // Your Gmail password
  },
});

//add vendor
router.post("/add", async (req, res) => {
  try {
    let input = req.body;
    let shopId = input.shopId;
    let existShopId = await shopModel.findOne({ shopId: shopId });
    if (!existShopId) {
      return res.json({
        status: "error",
        message: "shop Id Does not exists",
      });
    }
    let newVendor = new vendorModel(input);
    await newVendor.save();
    const mailOptions = {
      from: "gowriraj2510@gmail.com",
      to: input.mailAddress,
      subject: "Vendor Added Successfully",
      html: `<p>Hello,</p>
             <p>You rented the shop successfully.</p>
              <p><strong>Name: ${input.firstName}</strong></p>
              <p><strong>Shop ID: ${input.shopId}</strong></p>
              <p><strong>Shop Rent: ${input.shopRent}</strong></p>
              <p><strong>Deposite Amount: ${input.depositeAmount}</strong></p><br>
              <p><strong>Lease Start Date: ${input.leaseStartDate}</strong></p><br>
              <p><strong>Lease End Date: ${input.leaseEndDate}</strong></p><br>
             <p>Thank you!</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.json({
          status: "error",
          message: "Failed to send email",
          error: error.message,
        });
      }
      console.log("Email sent: " + mailOptions.to);
    });
    return res.status(200).json({
      status: "success",
      message: "Successfully added vendor and sent email",
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
    let name = req.body.firstName;
    let shopId = req.body.shopId;
    let data = await vendorModel.findOne({ $or: [{ firstName: name }, { shopId: shopId }] });
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
router.get("/viewall", async (req, res) => {
  try {
    let data = await vendorModel.find();
    return res.json({
      data: data,
    });
  } catch (error) {
    console.error(error);
  }
});

//view shop numbers
router.post("/number", async (req, res) => {
  try {
    let shop = await vendorModel.find();
    let totalShops = shop.length;
    return res.json({
      status: "success",
      totalVendors: totalShops,
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
