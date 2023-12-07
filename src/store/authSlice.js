import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 600 * 10000; // 100분

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    accessToken: null,
    expireTime: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    deleteToken: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
});

export const { setToken, deleteToken } = authSlice.actions;

export default authSlice.reducer;
