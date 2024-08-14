import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socketSl",
  initialState: {
    mySocket: null,
    // mainObjSocket: null,
  },
  reducers: {
    setSocketId(state, action) {
      const socketIdOb = action.payload;
      console.log("socketIdOb", socketIdOb);
      state.mySocket = socketIdOb;
    },

    // setSocketObj(state, action) {
    //   const socketObInstance = action.payload;
    //   console.log("socketObInstance", socketObInstance);
    //   state.mainObjSocket = { ...socketObInstance };
    // },
  },
});

export const {
  setSocketId,
  // setSocketObj
} = socketSlice.actions;
export default socketSlice.reducer;
