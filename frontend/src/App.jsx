import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import Chat from "./components/chat/Chat.jsx";
import AddFriend from "./components/addFriend/AddFriend.jsx";
import socketIO from "socket.io-client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSocketId } from "./redux/slices/socketSlice.jsx";
import {
  setOnlineFriends,
  setCurrentMessage,
} from "./redux/slices/adminFriendsSlice.jsx";
import { setAdminInfo } from "./redux/slices/adminSlice";
import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();
  const adminOb = useSelector((state) => state.admin);

  // Fetch cookie and set it in Redux when the component mounts
  useEffect(() => {
    const loggedInInstance = Cookies.get("loggedInUser");

    if (loggedInInstance) {
      try {
        const loggedInParsed = JSON.parse(loggedInInstance);
        dispatch(setAdminInfo(loggedInParsed));
      } catch (error) {
        console.error("Failed to parse logged in user data", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (adminOb) {
      const socket = socketIO("http://localhost:7889", {
        transports: ["websocket"],
        query: {
          userId: adminOb?._id,
        },
      });

      socket.on("connect", () => {
        console.log("socket obj-----", socket);
        dispatch(setSocketId(socket.id));
        // dispatch(setSocketObj(socket));

        console.log("Frontend socket connection successful", socket.id);

        socket.on("onlineUsers", (myOnnlineFrd) => {
          dispatch(setOnlineFriends(myOnnlineFrd));
        });

        socket.on("receiveMessage", (userMsgOb) => {
          dispatch(setCurrentMessage(userMsgOb));
        });
      });

      return () => {
        socket.disconnect();
        socket.off();
      };
    }
  }, [adminOb]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/Login" element={<Login />} />
        <Route path="/user/chats" element={<Chat />} />
        <Route path="/user/addFriends" element={<AddFriend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
