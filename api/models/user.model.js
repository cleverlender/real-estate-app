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
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1696636800&semt=ais",
    },
  },
  { timestamps: true }
);

// Create the User model itself
const User = mongoose.model("User", userSchema);

// Export so that we can use this model anywhere else in the application
export default User;
