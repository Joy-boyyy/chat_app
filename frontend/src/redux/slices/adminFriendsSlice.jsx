import { createSlice } from "@reduxjs/toolkit";

const adminFriendsStateInfo = {
  friendsList: [],
  friendMsg: [],
  isTrue: true,
  selectedFriendToMsg: {},
  messageNotFound: "",
  onlineFriens: [],
};

const adminFrdSlice = createSlice({
  name: "adminFrd",
  initialState: adminFriendsStateInfo,
  reducers: {
    setAdminFriendsInfo(state, action) {
      const adminData = action.payload;
      state.friendsList = [...adminData];
    },

    setFriendMsg(state, action) {
      const adminData = action.payload;
      console.log("admin message Data-----", adminData);
      state.friendMsg = [...adminData];
    },

    setFalseFun(state, action) {
      const adminDataFalse = action.payload;
      console.log("adminDataFalse-----", adminDataFalse);
      state.isTrue = adminDataFalse;
    },

    setSelectedFriend(state, action) {
      const adminSelectedFriend = action.payload;
      console.log("adminDataFalse-----", adminSelectedFriend);
      state.selectedFriendToMsg = { ...adminSelectedFriend };
    },

    setMsgNotFound(state, action) {
      const friendsMsg = action.payload;
      console.log("adminDataFalse-----", friendsMsg);
      state.messageNotFound = friendsMsg;
    },

    setCurrentMessage(state, action) {
      const recetfriendsMsg = action.payload;
      console.log("recetfriendsMsg-----", recetfriendsMsg);
      state.friendMsg.push(recetfriendsMsg);
    },

    setOnlineFriends(state, action) {
      const myOnlineFriends = action.payload;
      console.log("myOnlineFriends", myOnlineFriends);
      state.onlineFriens = [...myOnlineFriends];
    },
  },
});

export const {
  setAdminFriendsInfo,
  setFriendMsg,
  setFalseFun,
  setSelectedFriend,
  setMsgNotFound,
  setCurrentMessage,
  setOnlineFriends,
} = adminFrdSlice.actions;
export default adminFrdSlice.reducer;
