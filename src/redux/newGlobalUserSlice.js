import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalUser: "login"
};

export const globalUserSlice = createSlice({
  name: "globalUser",
  initialState,
  reducers: {
    setGlobalUserRedux: (state, action) => {
      state.globalUser = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setGlobalUserRedux } = globalUserSlice.actions;

export const selectGlobalUser = (state) => state.globalUser.globalUser;

export default globalUserSlice.reducer;