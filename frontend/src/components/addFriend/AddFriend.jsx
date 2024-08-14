import { IoArrowBack } from "react-icons/io5";
import "./addFriend.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddFriend = () => {
  const navigate = useNavigate();
  const [emaiTrace, setEmailTrace] = useState("");
  const [emaiTraceErr, setEmailTraceErr] = useState("");

  const addMyFriendFun = async () => {
    try {
      const addingFrindRes = await axios.post(
        "http://localhost:7889/user/addFriend",
        {
          oneFriendEmail: emaiTrace,
        },
        {
          withCredentials: true,
        }
      );

      console.log("addingFrindRes====>", addingFrindRes);
      setEmailTraceErr("");
      navigate("/user/chats");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        setEmailTraceErr(err.response.data.message);
      } else {
        console.log(err.message);
        setEmailTraceErr(err.message);
      }
    }
  };

  return (
    <div className="mainDIvCL w-screen h-screen  flex flex-col gap-9 justify-center items-center">
      <div className="w-[50%] mh-[50%]">
        <div
          className=" mb-2
h-[14%] w-[100%] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 border border-gray-100
"
        >
          <Link to="/user/chats">
            <IoArrowBack size={30} className="cursor-pointer text-white" />{" "}
          </Link>
        </div>
        <div
          className="
h-[88%] w-[100%] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60
"
        >
          <div className="text-center">
            <h1 className="text-2xl text-white">Give your friend Id</h1>
          </div>
          <div className="h-[80%] w-[100%] flex flex-col justify-center gap-6 p-5 ">
            <input
              onChange={(e) => {
                setEmailTrace(e.target.value);
              }}
              value={emaiTrace}
              type="email"
              placeholder="email@gmail.com"
              className="w-[100%] h-10 rounded-md pl-3 border-none outline-none"
            />
            <button
              onClick={addMyFriendFun}
              className="rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold w-[100%] h-10"
            >
              Search & Add
            </button>
          </div>
        </div>

        {/* error section  */}

        {emaiTraceErr && (
          <div
            className=" mt-2 text-center
h-[10%] w-[100%] bg-red-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 border border-gray-100
"
          >
            <p className="text-white">{emaiTraceErr}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFriend;
