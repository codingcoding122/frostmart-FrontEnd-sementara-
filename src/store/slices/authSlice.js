import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: localStorage.getItem("isLogin") === "true",
    user: JSON.parse(localStorage.getItem("user") || "null"),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
      localStorage.removeItem("isLogin");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
