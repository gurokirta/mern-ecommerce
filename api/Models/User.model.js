import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    secondName: {
      type: String,
    },
    displayName: {
      type: String,
      unique: true,
    },
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
    profilePicture: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
