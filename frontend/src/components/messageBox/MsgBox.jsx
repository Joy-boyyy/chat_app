import axios from "axios";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMessage } from "../../redux/slices/adminFriendsSlice";

const MessageBox = () => {
  const dispatch = useDispatch();
  const { selectedFriendToMsg } = useSelector((state) => state.adminFrd);
  const [userMessage, setUserMessage] = useState("");

  const sendMessage = async () => {
    try {
      const messageRes = await axios.post(
        "http://localhost:7889/user/messageToFriend",
        {
          receiverId: selectedFriendToMsg._id,
          message: userMessage,
        },
        {
          withCredentials: true,
        }
      );
      setUserMessage("");
      console.log("messageRes", messageRes);
      console.log("messageRes", messageRes.data.messageModelSave);
      dispatch(setCurrentMessage(messageRes.data.messageModelSave));
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="w-[100%] h-[100%] flex items-center gap-3 pl-4">
      <div className="w-[90%]">
        <input
          className="w-[100%] h-10 rounded-md border-none outline-none text-black pl-4"
          type="text"
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          placeholder="Type your message...."
        />
      </div>
      <div
        className="rounded-xl p-2 bg-green-700 cursor-pointer text-center"
        onClick={sendMessage}
      >
        <IoMdSend size={30} />
      </div>
    </div>
  );
};

export default MessageBox;
