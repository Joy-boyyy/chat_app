const jwt = require("jsonwebtoken");

const AuthMiddle = (req, res, next) => {
  const cookieToken = req.cookies.token;

  try {
    if (!cookieToken) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }
    const cookieVerifying = jwt.verify(cookieToken, process.env.SECREATEKEY);

    if (!cookieVerifying) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      req.adminId = cookieVerifying.myPass;

      next();
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = AuthMiddle;
