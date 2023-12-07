import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    removeUser: (state) => {
      state.username = null;
      state.role = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const getCurrentUser = (state) => state.user;

export default userSlice.reducer;
