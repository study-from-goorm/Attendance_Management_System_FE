import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerId: null,
  username: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.playerId = 1;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    removeUser: (state) => {
      state.playerId = null;
      state.username = null;
      state.role = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const getCurrentUser = (state) => state.user;

export default userSlice.reducer;
