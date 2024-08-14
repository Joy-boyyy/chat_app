const FriendModel = require("../modal/friends");

const FetchOnlyFriends = async (req, res, next) => {
  try {
    const myAdminId = req.adminId;
    // console.log("myAdminId", myAdminId);

    const populatingFriend = await FriendModel.findOne({
      admin: myAdminId,
    }).populate({ path: "friends", select: "-password" });

    if (!populatingFriend) {
      return res.status(404).json({ message: "No friends found" });
    } else {
      res.status(200).json(populatingFriend);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = FetchOnlyFriends;
