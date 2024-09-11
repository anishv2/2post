import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../shared/interfaces/miscalleneous";
import { ROUTES } from "../../routes/routeslinks";

const initialState: IAuth = {
  isAuthenticated: false,
  id: "",
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  accessToken: "",
  refreshToken: "",
  image: "",
  message: "",
  error: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    handleAuth(state, action) {
      const {
        firstName,
        lastName,
        email,
        accessToken,
        refreshToken,
        id,
        gender,
      } = action.payload;

      if (action.payload) {
        state.isAuthenticated = true;
        state.firstName = firstName;
        state.lastName = lastName;
        state.gender = gender;
        state.email = email;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.id = id;
      }
      return state;
    },
    handleAccessToken(state, action){
      state.accessToken = action.payload.accessToken;
      return state;
    },
    handleLogout(state) {
      window.location.href = ROUTES.HOME;
      localStorage.removeItem("persist:auth");
      state.id = "";
      state.isAuthenticated = false;
      state.firstName = "";
      state.lastName = "";
      state.gender = "", 
      state.email = "";
      state.accessToken = "";
      state.refreshToken = "";
      return state;
    },
  },
});

export const { handleAuth, handleAccessToken, handleLogout } = authSlice.actions;
export default authSlice.reducer;
