const mongoose = require("../dbConnection/dbConnect");

const friendSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  {
    timestamps: true,
  }
);

const FriendModel = mongoose.model("friend", friendSchema);

module.exports = FriendModel;
