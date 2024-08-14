const mongoose = require("../dbConnection/dbConnect");

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    library: [{ type: mongoose.Schema.Types.ObjectId, ref: "message" }],
  },
  {
    timestamps: true,
  }
);

const ConversationModel = mongoose.model("conversation", conversationSchema);

module.exports = ConversationModel;
