import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.user = action.payload.user;
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
      state.role = null;
      state.user = null;
    },
  },
});

export const getLoginStatus = (state) => {
  return state;
};

export const { setLoggedIn, setLoggedOut } = authSlice.actions;
export default authSlice.reducer;
