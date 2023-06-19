import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
    userType: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsSchema);
