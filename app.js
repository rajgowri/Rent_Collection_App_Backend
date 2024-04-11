const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./connectors/userRouter");
const shopRouter=require("./connectors/shopRouter")

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://gowri090:gowri2510@cluster0.37wleuc.mongodb.net/RentDb?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/user", userRouter);
app.use("/shop",shopRouter)

app.listen(3001, () => {
  console.log("Server is running..");
});
