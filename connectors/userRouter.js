const express = require("express");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const router = express.Router();

const hashFunction = async (pass) => {
  let salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pass, salt);
};

//user signup router
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
      return res.status(200).json({
        status: "success",
        message: "successfully registered user",
      });
    }
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

//user signin router
router.post("/signin", async (req, res) => {
  try {
    let input = req.body;
    let inputPassword = input.password;
    let data = await userModel.findOne({ emailAddress: input.emailAddress });
    if (!data) {
      return res.json({
        status: "error",
        message: "no user found",
      });
    }
    let dbPassword = data.password;
    let match = await bcrypt.compare(inputPassword, dbPassword);
    if (!match) {
      return res.json({
        status: "error",
        message: "incorrect password",
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "authentification successfull",
        data: data,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "somthing went wrong in user signin",
      error: error.message,
    });
  }
});

//user changePassword
router.post("/changePassword", async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body; 
    const data = await userModel.findById(id); 
    if (!data) {
      return res.json({
        status: "error",
        message: "no user found",
      });
    }
    const dbPassword = data.password;
    const match = await bcrypt.compare(oldPassword, dbPassword); 
    if (!match) {
      return res.json({
        status: "error",
        message: "incorrect password",
      });
    } else {
      data.password = newPassword; 
      await data.save();
      return res.status(200).json({
        status: "success",
        message: "password updated successfully",
      });
    }
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});


//change username and email id
router.post("/changeEmail", async (req, res) => {
  try {
    let input = req.body;
    let data = await userModel.findById(input.id);
    if (!data) {
      return res.json({
        status: "error",
        message: "no user found",
      });
    }
    data.emailAddress = input.emailAddress;
    await data.save();
    return res.status(200).json({
      status: "success",
      message: "successfully updated email address",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      message: "internal sever error",
    });
  }
});

//view user details
router.post("/viewProfile", async (req, res) => {
  try {
    let input=req.body
    let data=await userModel.findById(input.id)
    if(!data){
      return res.json({
        status:"error",
        message:'no user data found'
      })
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
    });
  }
});


module.exports = router;
