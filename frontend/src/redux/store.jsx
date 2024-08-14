import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";
import adminFrdSlice from "./slices/adminFriendsSlice";
import socketSlice from "./slices/socketSlice";

const store = configureStore({
  reducer: {
    admin: adminSlice,
    adminFrd: adminFrdSlice,
    socket: socketSlice,
  },
});

export default store;
