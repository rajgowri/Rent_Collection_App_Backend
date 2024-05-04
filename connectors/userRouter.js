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
      const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the saltRounds
      data.password = hashedPassword; 
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


//change username 
router.post("/changeusername", async (req, res) => {
  try {
      const { userId, firstName } = req.body; // Modified to receive userId instead of email

      // Find the user by userId
      const user = await userModel.findOne({ _id: userId }); // Assuming userId is stored in the '_id' field
      if (!user) {
          return res.json({
              status: "error",
              message: "User not found",
          });
      }

      // Update the username
      user.name = firstName;

      // Save the updated user
      await user.save();

      res.json({
          status: "success",
          message: "Username updated successfully",
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
          },
      });
  } catch (error) {
      console.error("Error changing username:", error);
      res.status(500).json({
          status: "error",
          message: "Internal server error",
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
