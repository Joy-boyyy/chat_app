const UserModel = require("../modal/users");

const AllUser = async (req, res, next) => {
  try {
    const allLoginUser = await UserModel.find();

    if (!allLoginUser) {
      return res.status(404).json({ message: "No user found" });
    } else {
      return res.status(200).json({ allLoginUser, success: true });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = AllUser;
