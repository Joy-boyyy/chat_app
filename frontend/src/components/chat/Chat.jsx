import React from "react";
import "./chat.css";
import useFriends from "../hook/useFriends";
// import useGetUserFromCookie from "../hook/useGetUserFromCookie";
import FriendsSection from "../friendSection/FriendsSection";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../messageBox/MsgBox";
import UserChats from "../allChats/UserChats";
import { CiLogout } from "react-icons/ci";
import Cookies from "js-cookie";
import { setAdminInfo } from "../../redux/slices/adminSlice";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAdminObj = useSelector((state) => state.admin);
  const {
    isTrue,
    selectedFriendToMsg,
    messageNotFound,
    onlineFriens,
    friendMsg,
  } = useSelector((state) => state.adminFrd);

  useFriends();
  // useGetUserFromCookie();

  const logOutFun = () => {
    const myCookie = Cookies.get("token");

    if (myCookie !== undefined) {
      Cookies.remove("token");
      Cookies.remove("loggedInUser");

      dispatch(setAdminInfo(null));
      navigate("/user/Login");
    }
  };

  return (
    <div className="w-screen h-screen chatBg flex justify-center items-center">
      <div
        className="
h-[90%] w-[90%] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100

flex  text-white"
      >
        <div className="basis-[50%] border border-white flex flex-col">
          <div className="w-[100%] h-[100%] overflow-y-auto">
            <FriendsSection />
          </div>

          <div
            className=" flex items-center pl-2 gap-4
            w-[100%] h-[10%] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-100
            "
          >
            <Link to="/user/addFriends">
              <IoMdAddCircleOutline size={30} className="cursor-pointer" />
            </Link>

            <CiLogout
              size={30}
              className="cursor-pointer"
              onClick={logOutFun}
            />
          </div>
        </div>
        <div className="basis-[50%]">
          {isTrue ? (
            <div className="w-[100%] h-[100%] flex justify-center items-center">
              <h1> Welcome {userAdminObj?.profileName} !!!!</h1>
            </div>
          ) : (
            <div className="w-[100%] h-[100%]">
              <div
                className=" flex gap-5 items-center pl-5
            w-[100%] h-[10%] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-100
            "
              >
                <div
                  className={`w-[7%]   ${onlineFriens.includes(
                    selectedFriendToMsg._id ? "avatar online" : ""
                  )}`}
                >
                  <img
                    src={selectedFriendToMsg.profilePic}
                    alt="friend_pic"
                    className="w-[100%] h-[100%] rounded-xl"
                  />
                </div>
                <p>{selectedFriendToMsg.profileName}</p>
              </div>
              <ScrollToBottom className="w-[100%] h-[80%] overflow-y-auto">
                {friendMsg.length < 1 && <p>{messageNotFound}</p>}
                <UserChats />
              </ScrollToBottom>

              {/* send emssage section  */}

              <div
                className="
            w-[100%] h-[10%] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-100
            "
              >
                <MessageBox />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
