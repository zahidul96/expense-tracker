import { createSlice } from "@reduxjs/toolkit";
const initialToken = localStorage.getItem("token");
const initialAuthState = { token: initialToken, isLoggIn: !!initialToken };
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      if (action.payload) {
        const token = action.payload;
        state.token = token;
        state.isLoggIn = !!token;

        localStorage.setItem("token", token);
      }
    },
    logout(state) {
      state.token = null;
      state.isLoggIn = !!state.token;
      localStorage.removeItem("token");
    },
  },
});
export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
