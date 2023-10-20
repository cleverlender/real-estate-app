import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  // destructure and save the username/email/passwords from the req.body (insomnia) into their respective variables
  const { username, email, password } = req.body;

  // hash the password
  // 10 is the number of rounds in the hashing (salt)
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  // if there is any error in creating a new User, send error message to user
  try {
    // Add 'await' so that the code stays on this line until the operation is finished to prevent errors
    await newUser.save();

    // Create a status response that something was created (201)
    res.status(201).json("User created successfully!");
  } catch (error) {
    // Create a status response that an error happened (500)
    next(error);
  }
};
