import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminFriendsInfo } from "../../redux/slices/adminFriendsSlice";

const useFriends = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const myFriends = await axios.get(
          "http://localhost:7889/user/allFriends",
          {
            withCredentials: true,
          }
        );
        console.log(myFriends.data);
        dispatch(setAdminFriendsInfo(myFriends.data.friends));
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(err.message);
        }
      }
    };

    fetchFriends();
  }, []);
};

export default useFriends;
