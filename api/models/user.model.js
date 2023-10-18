import mongoose from "mongoose";

// Create the user model rules which is called a 'Schema'
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the User model itself
const User = mongoose.model("User", userSchema);

// Export so that we can use this model anywhere else in the application
export default User;
