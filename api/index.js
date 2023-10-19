import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

// initialize dotenv (aka start it up)
dotenv.config();

// connect to the MongoDB database we created
// actual URL is saved in a process dot env file called 'MONGO'
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Allow JSON to be sent to the server
app.use(express.json());

app.listen(3000, () => {
  console.log("The Server is running on port 3000!!!");
});

// Create an API route to the home page ('/')
// req = Request - Data we get from the Browser/Client side
// res = Response - Data we send back from the Server side
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
