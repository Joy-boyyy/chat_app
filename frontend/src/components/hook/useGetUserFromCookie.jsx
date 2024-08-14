import { useEffect } from "react";
import Cookies from "js-cookie";
import { setAdminInfo } from "../../redux/slices/adminSlice";
import { useDispatch } from "react-redux";

const useGetUserFromCookie = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInInstance = Cookies.get("loggedInUser");
    const loggedInParsed = JSON.parse(loggedInInstance);
    console.log("loggedInInstance===>", loggedInParsed);

    if (loggedInInstance !== undefined) {
      dispatch(setAdminInfo(loggedInParsed));
    }
  });
};

export default useGetUserFromCookie;
