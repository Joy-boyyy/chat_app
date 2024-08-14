const Logout = (req, res, next) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: "" })
      .json({ message: "User Logout !!!" });
  } catch (err) {
    next(err);
  }
};
module.exports = Logout;
