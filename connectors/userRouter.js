const express = require("express");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const router = express.Router();

const hashFunction = async (pass) => {
  let salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pass, salt);
};

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

//user signin
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
      return res.json({
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
    let input = req.body;
    let inputPassword = input.oldPassword;
    let data = await userModel.findById(input.id);
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
      data.password = input.newPassword;
      await data.save();
      return res.json({
        status: "success",
        message: "password updated successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      message: "internal server error",
    });
  }
});

//change username and email id
router.post("/changeEmail",async(req,res)=>{
  try {
    let input=req.body
    let data=await userModel.findOne({emailAddress:input.emailAddress})
    if(!data){
      return res.json({
        status:"error",
        message:"no user found"
      })
    }

  } catch (error) {
    console.error(error)
    return res.json({
      status:'error',
      message:"internal sever error"
    })
  }
})




module.exports = router;