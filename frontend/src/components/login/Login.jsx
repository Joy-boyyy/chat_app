import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setAdminInfo } from "../../redux/slices/adminSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const doSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerUserRes = await axios.post(
        "http://localhost:7889/user/login",
        {
          email: userInfo.email,
          password: userInfo.password,
        }
      );

      console.log("registerUserRes==> ", registerUserRes);
      if (registerUserRes.data.success) {
        Cookies.set("token", registerUserRes.data.yourCookie, { expires: 1 });
        Cookies.set(
          "loggedInUser",
          JSON.stringify(registerUserRes.data.userInfo),
          {
            expires: 1,
          }
        );

        toast.success(registerUserRes.data.message);

        dispatch(setAdminInfo(registerUserRes.data.userInfo));

        setTimeout(() => {
          navigate("/user/chats");
        }, 2000);
      }

      setErrMsg("");
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        setErrMsg(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        console.log(err.message);
      }
    }

    setUserInfo({
      name: "",
      displayName: "",
      email: "",
      password: "",
      genderinfo: "",
    });
  };

  return (
    <div className="w-screen h-screen registerbgCss flex justify-center items-center">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div
        className="
mh-[60%] w-[50%] bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100
p-4"
      >
        <div className="flex justify-center text-white mb-3">
          <h1>Signin</h1>
        </div>
        <form className="w-[100%]" onSubmit={doSubmit}>
          <input
            className="pl-4 w-[100%] h-9 rounded-md mb-5"
            type="email"
            placeholder="your_email@email.com"
            value={userInfo.email}
            onChange={(e) => {
              setUserInfo((prevData) => ({
                ...prevData,
                email: e.target.value,
              }));
            }}
          />
          <input
            className="pl-4 w-[100%] h-9 rounded-md mb-5"
            type="password"
            placeholder="your_password"
            value={userInfo.password}
            onChange={(e) => {
              setUserInfo((prevData) => ({
                ...prevData,
                password: e.target.value,
              }));
            }}
          />

          <button
            className="btn  btn-accent  w-[100%]  rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>
        {errMsg && (
          <div className="mb-6 mt-6 w-[100%] flex justify-center items-center bg-red-600 h-9 rounded-md">
            <p className="text-white">{errMsg}</p>
          </div>
        )}

        <div className="mt-4 mb-4 w-[100%] flex justify-center text-white">
          <p>
            new user ?{" "}
            <Link to="/user/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
