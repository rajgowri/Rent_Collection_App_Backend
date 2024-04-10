const express = require("express");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const router = express.Router();

const hashFunction = async (pass) => {
  let salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pass, salt);
};

//user registration model
//user registration model
router.post("/signup", async (req, res) => {
  try {
    let input = req.body;
    let inputPassword = input.password;
    let data = await userModel.findOne({ emailAddress: input.emailAddress });
    if (!data) {
      let hashedPassword = await hashFunction(inputPassword);
      input.password = hashedPassword;
      let newUser = new userModel(input);
      await newUser.save();
      return res.json({
        status: "success",
        message: "successfully registered user",
      });
    }
    // User already exists, send error response
    return res.status(400).json({
      status: "error",
      message: "user already exists",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "something went wrong in user registration",
    });
  }
});

module.exports = router;
