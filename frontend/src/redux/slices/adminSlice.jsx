import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: null,
  reducers: {
    setAdminInfo(state, action) {
      const adminData = action.payload;
      //   below directly storing data into state
      return adminData;
    },
  },
});

export const { setAdminInfo } = adminSlice.actions;
export default adminSlice.reducer;
