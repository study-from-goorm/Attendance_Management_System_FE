import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    accessToken: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
    },
    deleteToken: (state) => {
      state.authenticated = false;
      state.accessToken = null;
    },
  },
});

export const { setToken, deleteToken } = authSlice.actions;
export const getCurrentAuth = (state) => state.auth;

export default authSlice.reducer;
