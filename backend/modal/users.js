const mongoose = require("../dbConnection/dbConnect");

const userSchema = new mongoose.Schema(
  {
    profileName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female"] },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
