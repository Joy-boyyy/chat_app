const ConversationModel = require("../modal/conversationModel");

const OneMessages = async (req, res, next) => {
  try {
    const urSenderAdminId = req.adminId;

    const { receiverId } = req.query;

    const checkingOldMessages = await ConversationModel.findOne({
      participants: { $all: [urSenderAdminId, receiverId] },
    }).populate("library");

    console.log("checkingOldMessages===", checkingOldMessages);

    if (!checkingOldMessages) {
      return res
        .status(500)
        .json({ message: "No any conversations done yet !!!!" });
    }

    if (checkingOldMessages.length < 1) {
      return res.status(404).json({ message: "No conversation found" });
    } else {
      console.log(checkingOldMessages);
      res
        .status(200)
        .json({ messages: "all Conversations", checkingOldMessages });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = OneMessages;
