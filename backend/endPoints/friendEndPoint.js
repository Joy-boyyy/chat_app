const FriendModel = require("../modal/friends.js");
const UserModel = require("../modal/users.js");

const myFriends = async (req, res, next) => {
  console.log("adding friend");
  const adminID = req.adminId;
  console.log("Admin Id", adminID);
  const { oneFriendEmail } = req.body;

  try {
    const findingFriend = await UserModel.findOne({ email: oneFriendEmail });

    if (!findingFriend) {
      return res.status(401).json({ message: "User not found !" });
    }

    try {
      const checkingIsAdmin = await FriendModel.findOne({ admin: adminID });

      if (!checkingIsAdmin) {
        const FrdCreate = new FriendModel({
          admin: adminID,
          friends: [findingFriend._id],
        });

        await FrdCreate.save();
        res.status(200).json({ message: "friend added Seccessfully" });
      } else {
        const addedNewFriend = await FriendModel.updateOne(
          { admin: adminID },
          { $push: { friends: findingFriend._id } }
        );

        if (!addedNewFriend.acknowledged) {
          return res.status(401).json({ message: "Friend already added" });
        } else {
          res.status(200).json({ message: "Friend added successfully" });
        }
      }
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = myFriends;
