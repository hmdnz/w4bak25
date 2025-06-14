// src/actions.js
import axios from "axios";
import { api } from "../helper/apis";

export const signupSuccess = (user) => ({
  type: "SIGNUP_SUCCESS",
  payload: user,
});

// actions.js
// actions.js
export const loginSuccess =
  (email, access_token, token_type, name, user_id, profile_picture) =>
  (dispatch) => {
    // Store user data in localStorage
    const userData = JSON.stringify({
      email,
      access_token,
      token_type,
      name,
      user_id,
      profile_picture,
    });
    localStorage.setItem("user_data", userData);

    // Dispatch the action to update Redux state
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        email,
        access_token,
        token_type,
        name,
        user_id,
        profile_picture,
      },
    });
  };

export const loginFailure = (errorMessage) => ({
  type: "LOGIN_FAILURE",
  payload: errorMessage,
});

export const signup =
  (email, name, phone, password, nin) => async (dispatch) => {
    try {
      const response = await axios.post(`${api}/api/auth/users/create`, {
        email,
        name,
        phone,
        nin,
        password,
      });
      // const {
      //   email: userEmail,
      //   access_token,
      //   token_type,
      //   name: userName,
      //   user_id,
      // } = response.data;
      const user = {
        email: userEmail,
        access_token,
        token_type,
        name: userName,
        user_id,
        profile_picture,
      };
      // const userData = JSON.stringify({
      //   email,
      //   access_token,
      //   token_type,
      //   name,
      //   user_id,
      // });
      // console.log(response.data);
      // localStorage.setItem("access_token", userData);
      dispatch(signupSuccess(user));
      // dispatch(login(email, password)); // Automatically log in after successful signup
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        const errorMessage = error.response.data.detail;
        dispatch(loginFailure(errorMessage)); // Dispatch an action with the error message
        // console.log("Registration failed: " + errorMessage + "!");
      } else {
        console.error("Login failed:", error);
      }
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${api}/auth/users/login`, {
      email,
      password,
    });

    const {
      email: userEmail,
      access_token,
      token_type,
      name,
      user_id,
      profile_picture,
    } = response.data;
    const user = {
      email: userEmail,
      access_token,
      token_type,
      name,
      user_id,
      profile_picture,
    };
    const userData = JSON.stringify({
      email,
      access_token,
      token_type,
      name,
      user_id,
      profile_picture,
    });
    dispatch(loginSuccess(user));
    localStorage.setItem("access_token", userData);
    // console.log(user);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      const errorMessage = error.response.data.detail;
      dispatch(loginFailure(errorMessage)); // Dispatch an action with the error message
      // console.log(errorMessage);
    } else {
      console.error("Login failed:", error);
    }
  }
};

// Example implementation of restoreUserFromLocalStorage action
export const restoreUserFromLocalStorage = () => (dispatch) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    dispatch(loginSuccess({ access_token }));
  }
};
