const UserModel = require("../modal/users");
const CustomErr = require("../Error/customErr");
const bcrypt = require("bcrypt");

const Register = async (req, res, next) => {
  const { name, profileName, email, password, gender } = req.body;

  if (!name || !profileName || !email || !password || !gender) {
    return next(new CustomErr("All fields are required", 400));
  }

  try {
    const checkingUser = await UserModel.findOne({ email });

    if (checkingUser) {
      return res
        .status(403)
        .json({ message: "Already a user, Please use unique email id !!!" });
    }

    const malePic = `https://avatar.iran.liara.run/public/boy`;
    const femalePic = `https://avatar.iran.liara.run/public/girl`;

    const selectedPic = gender === "male" ? malePic : femalePic;

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Somethig went wronge before Salting password" });
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res
            .status(500)
            .json({ message: "Somethig went wronge while Salting password" });
        }

        const createNewUser = new UserModel({
          name,
          profileName,
          email,
          password: hash,
          profilePic: selectedPic,
          gender,
        });

        const userRes = await createNewUser.save();

        console.log(userRes);
        res.status(201).json({
          message: "User created SuccessFul !!!",
          userData: userRes,
          success: true,
        });
      });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = Register;
