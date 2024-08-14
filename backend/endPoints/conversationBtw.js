const MessageModel = require("../modal/messages");
const CustomErr = require("../Error/customErr");
const ConversationModel = require("../modal/conversationModel");

let ioInstance;
let getSocketIdFunc;

const initialize = (io, getMySocketId) => {
  ioInstance = io;
  getSocketIdFunc = getMySocketId;
};

const ConversationBtwHistory = async (req, res, next) => {
  try {
    const urSenderId = req.adminId;
    const { receiverId, message } = req.body;

    if (!receiverId || !message) {
      return next(new CustomErr("All fields are required", "401"));
    }

    const findinExistindFriends = await ConversationModel.find({
      participants: { $all: [urSenderId, receiverId] },
    });

    if (findinExistindFriends.length < 1) {
      const messageModelSet = new MessageModel({
        sender: urSenderId,
        receiver: receiverId,
        message: message,
      });

      const CreatingConversationIns = new ConversationModel({
        participants: [urSenderId, receiverId],
        library: [messageModelSet._id],
      });

      if (!CreatingConversationIns && !messageModelSet) {
        return next(new CustomErr("Failed to create conversation", "401"));
      } else {
        const savedConversation = await CreatingConversationIns.save();
        const messageModelSave = await messageModelSet.save();
        res.status(201).json({
          message: "Successfully created and sent message",
          savedConversation,
          messageModelSave,
        });
      }
    } else {
      const messageModelSet = new MessageModel({
        sender: urSenderId,
        receiver: receiverId,
        message: message,
      });

      const messageModelSave = await messageModelSet.save();

      const CreatingConversationIns = await ConversationModel.updateOne(
        { participants: { $all: [urSenderId, receiverId] } },
        { $push: { library: messageModelSet._id } }
      );

      if (!CreatingConversationIns && !messageModelSave) {
        return next(new CustomErr("Failed to create conversation", "401"));
      } else {
        res.status(201).json({
          message: "Message sent Successfully",
          CreatingConversationIns,
          messageModelSave,
        });
      }

      const receiverSocketId = getSocketIdFunc(receiverId);
      if (receiverSocketId) {
        // Emit message to the receiver
        ioInstance.to(receiverSocketId).emit("receiveMessage", {
          sender: urSenderId,
          message: message,
          receiver: receiverId,
          updatedAt: new Date(),
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

// module.exports = ConversationBtwHistory;
module.exports = { initialize, ConversationBtwHistory };
