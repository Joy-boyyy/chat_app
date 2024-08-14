import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    displayName: "",
    email: "",
    password: "",
    genderinfo: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const doSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerUserRes = await axios.post(
        "http://localhost:7889/user/register",
        {
          name: userInfo.name,
          profileName: userInfo.displayName,
          email: userInfo.email,
          password: userInfo.password,
          gender: userInfo.genderinfo,
        }
      );

      console.log("registerUserRes==> ", registerUserRes);
      if (registerUserRes.data.success) {
        toast.success(registerUserRes.data.message);

        setTimeout(() => {
          navigate("/user/Login");
        }, 1500);
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
          <h1>Register</h1>
        </div>
        <form className="w-[100%]" onSubmit={doSubmit}>
          <input
            type="text"
            placeholder="your name....!"
            className="pl-4 w-[100%] h-9 rounded-md mb-5"
            value={userInfo.name}
            onChange={(e) => {
              setUserInfo((prevData) => ({
                ...prevData,
                name: e.target.value,
              }));
            }}
          />
          <input
            type="text"
            placeholder="Your display Name....!"
            className="pl-4 w-[100%] h-9 rounded-md mb-5"
            value={userInfo.displayName}
            onChange={(e) => {
              setUserInfo((prevData) => ({
                ...prevData,
                displayName: e.target.value,
              }));
            }}
          />
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

          <div className="mb-5 flex gap-4">
            <label className="text-white cursor-pointer" htmlFor="male">
              male:
              <input
                type="radio"
                name="radiobutton"
                id="male"
                value="male"
                checked={userInfo.genderinfo === "male"}
                onChange={(e) => {
                  setUserInfo((prevData) => ({
                    ...prevData,
                    genderinfo: e.target.value,
                  }));
                }}
              />
            </label>

            <label htmlFor="female" className="text-white cursor-pointer">
              female:{" "}
              <input
                type="radio"
                name="radiobutton"
                id="female"
                value="female"
                checked={userInfo.genderinfo === "female"}
                onChange={(e) => {
                  setUserInfo((prevData) => ({
                    ...prevData,
                    genderinfo: e.target.value,
                  }));
                }}
              />
            </label>
          </div>

          <button
            className="btn  btn-accent  w-[100%]  rounded-md"
            type="submit"
          >
            Register
          </button>
        </form>
        {errMsg && (
          <div className="mb-6 mt-6 w-[100%] flex justify-center items-center bg-red-600 h-9 rounded-md">
            <p className="text-white">{errMsg}</p>
          </div>
        )}

        <div className="mt-4 mb-4 w-[100%] flex justify-center text-white">
          <p>
            already a user ?{" "}
            <Link to="/user/Login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
