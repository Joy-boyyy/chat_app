const mongoose = require("../dbConnection/dbConnect");

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("message", messageSchema);

module.exports = MessageModel;
