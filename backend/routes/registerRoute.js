const express = require("express");
const Register = require("../endPoints/userRegister");
const Login = require("../endPoints/userLogin");
const Logout = require("../endPoints/userLogout");
const AllUser = require("../endPoints/fetchAllUser");
const AuthMiddle = require("../middleware/authenticationMiddle");
const myFriends = require("../endPoints/friendEndPoint");
const FetchOnlyFriends = require("../endPoints/fetchOnlyFriends");
const { ConversationBtwHistory } = require("../endPoints/conversationBtw");
const OneMessages = require("../endPoints/fetchingOneOneMsg");

const registerRouter = express.Router();

registerRouter.route("/register").post(Register);
registerRouter.route("/login").post(Login);
registerRouter.route("/logout").get(Logout);
registerRouter.route("/users").get(AuthMiddle, AllUser);
registerRouter.route("/addFriend").post(AuthMiddle, myFriends);
registerRouter.route("/allFriends").get(AuthMiddle, FetchOnlyFriends);
registerRouter
  .route("/messageToFriend")
  .post(AuthMiddle, ConversationBtwHistory);
registerRouter.route("/allMessages").get(AuthMiddle, OneMessages);

module.exports = registerRouter;
