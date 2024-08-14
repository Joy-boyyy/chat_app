const UserModel = require("../modal/users");
const CustomErr = require("../Error/customErr");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const Login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomErr("All fields are required", 400));
  }

  try {
    const checkingUser = await UserModel.findOne({ email });

    if (!checkingUser) {
      return res.status(404).json({ message: "User not found !!!" });
    }

    const compairingPass = await bcrypt.compare(
      password,
      checkingUser.password
    );

    if (!compairingPass) {
      return res.status(401).json({ message: "Something went wrong !!!" });
    } else {
      const token = jwt.sign(
        { myPass: checkingUser._id },
        process.env.SECREATEKEY,
        {
          expiresIn: "1d",
        }
      );

      return res
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "None",
        })
        .status(200)
        .json({
          userInfo: checkingUser,
          success: true,
          message: "login Successful !!!!",
          yourCookie: token,
        });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = Login;
