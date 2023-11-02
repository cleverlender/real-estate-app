import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";

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

const __dirname = path.resolve();

const app = express();

// Allow JSON to be sent to the server
app.use(express.json());

// Initialize cookie Parser which is used to verify tokens
app.use(cookieParser());

app.listen(3000, () => {
  console.log("The Server is running on port 3000!");
});

// Create an API route to the home page ('/')
// req = Request - Data we get from the Browser/Client side
// res = Response - Data we send back from the Server side
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Create a middleware that will take error (error coming from input), request (data from browser/client),
// res (response from server side) and next (to go to the next middleware)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
