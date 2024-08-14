import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setFriendMsg,
  setFalseFun,
  setSelectedFriend,
  setMsgNotFound,
} from "../../redux/slices/adminFriendsSlice";

const FriendsSection = () => {
  const dispatch = useDispatch();
  // const adminOb = useSelector((state) => state.admin);

  // console.log("adminOb====", adminOb);

  const adminFriendObj = useSelector((state) => state.adminFrd);
  const { onlineFriens } = useSelector((state) => state.adminFrd);

  const conversationMsgFun = async (friendOb) => {
    try {
      const msgRes = await axios(
        `http://localhost:7889/user/allMessages?receiverId=${friendOb._id}`,
        {
          withCredentials: true,
        }
      );

      console.log("msgRes", msgRes);

      // ---------------setting data in slice
      dispatch(setMsgNotFound(""));
      dispatch(setSelectedFriend(friendOb));
      dispatch(setFriendMsg(msgRes.data.checkingOldMessages.library));
      dispatch(setFalseFun(false));
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
        dispatch(setMsgNotFound(err.response.data.message));
        dispatch(setFalseFun(false));
        dispatch(setSelectedFriend(friendOb));
        dispatch(setFriendMsg(""));
      } else {
        console.log(err.message);
        dispatch(setFriendMsg(""));
        dispatch(setMsgNotFound(err.message));
        dispatch(setFalseFun(false));
        dispatch(setSelectedFriend(friendOb));
      }
    }
  };

  return (
    <div className="p-2">
      {adminFriendObj?.friendsList?.map((mapProp) => (
        <div
          className=" flex gap-4 items-center border border-b-white p-2 rounded-2xl mb-3 cursor-pointer backdrop-filter backdrop-blur-sm bg-opacity-0 "
          key={mapProp._id}
          onClick={() => {
            conversationMsgFun(mapProp);
          }}
        >
          <div
            className={` ${
              onlineFriens.includes(mapProp._id) ? "avatar online" : ""
            } rounded-md w-[8%] h-[8%]`}
          >
            <img
              className="w-[100%] h-[100%] rounded-md"
              src={mapProp.profilePic}
              alt="profile"
            />
          </div>
          <p>{mapProp.profileName}</p>
        </div>
      ))}
    </div>
  );
};

export default FriendsSection;
