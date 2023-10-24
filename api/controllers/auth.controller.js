import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if this email already exists
    const validUser = await User.findOne({ email });

    // Check credentials
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "Wrong e-mail or password!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    // Check if this current user exists
    const user = await User.findOne({ email: req.body.email });

    // If user exists, authenticate the user
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // Create a random password for this User since google auth doesn't create a required password
      // Generates a random number, convert to string, 36 means numbers from 0 - 9 and letters A - Z
      // Grab the last 8 digits
      // Do it twice to make a 16 character secure password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      // Hash the password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
