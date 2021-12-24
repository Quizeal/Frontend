import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_LOADED,
  AUTH_FAILURE,
  LOGOUT,
} from "../actions/type";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import { setMyAlert } from "./myAlert";
import { setLoading } from "./loading";
import { clearQuiz } from "./quiz";

let AccessTimer = null;

// Refresh and access token both are updated.
// Pls fix at backend to update and blacklist only access-token
const accessToken = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const tokenRefresh = localStorage["token-refresh"];
  if (!tokenRefresh) {
    return console.log("ACCESS TOKEN COULDN'T FOUND", tokenRefresh);
  }
  const body = JSON.stringify({ refresh: tokenRefresh });
  try {
    const res = await axios.post(
      "https://quizeal-backend.herokuapp.com/token-refresh/",
      body,
      config
    );
    console.log("ACCESS TOKEN REFRESH SUCCESS");

    const { access, refresh } = res.data;
    localStorage["token-access"] = access;
    localStorage["token-refresh"] = refresh;

    setAuthToken(access);
  } catch (error) {
    console.log("ACCESS TOKEN REFRESH FAILED", error.response);
  }
};

// Add Error Handling
export const loadUser = () => async (dispatch) => {
  const tokenAccess = localStorage["token-access"];

  if (tokenAccess) {
    dispatch(setLoading(true));
    setAuthToken(tokenAccess);
  } else {
    dispatch({
      type: AUTH_FAILURE,
    });
    dispatch(clearQuiz());
    return;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = { token: tokenAccess };
  try {
    const res = await axios.post(
      "https://quizeal-backend.herokuapp.com/load-user/",
      body,
      config
    );
    dispatch(setLoading(false));
    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
    AccessTimer = setInterval(accessToken(), 1000 * 55 * 60);
  } catch (error) {
    dispatch(setLoading(false));
    dispatch({
      type: AUTH_FAILURE,
    });

    dispatch(clearQuiz());
    // dispatch(
    //   setMyAlert(error.response.data.detail || error.response.statusText)
    // );
  }
};

// Done
export const login = (username, password) => async (dispatch) => {
  dispatch(setLoading(true));
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = { username, password };
  try {
    const res = await axios.post(
      "https://quizeal-backend.herokuapp.com/login/",
      body,
      config
    );
    dispatch(setLoading(false));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setMyAlert("Login Successfully"));
  } catch (err) {
    dispatch(setLoading(false));
    dispatch({
      type: LOGIN_FAILURE,
    });
    dispatch(clearQuiz());

    dispatch(setMyAlert(err.response.data.detail));
  }
};

// Done
export const signup = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = formData;
  try {
    const res = await axios.post(
      "https://quizeal-backend.herokuapp.com/register/",
      body,
      config
    );
    dispatch(setLoading(false));
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(setMyAlert("Signup Successfully, Please login to continue."));
    return res.status;
  } catch (err) {
    dispatch(setLoading(false));
    dispatch({
      type: SIGNUP_FAILURE,
    });
    dispatch(clearQuiz());
    dispatch(
      setMyAlert(
        err.response.data.detail.username || err.response.data.detail.email
      )
    );
    return err.response.status;
  }
};

// Add Logout API at backend and update this function
export const logout = (msg) => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  clearInterval(AccessTimer);
  dispatch(clearQuiz());
  dispatch(setMyAlert(msg || "Logout Successfully"));
};

// Done
export const changePassword = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch(setLoading(true));
  const body = JSON.stringify({
    ...formData,
    token: localStorage["token-access"],
  });
  try {
    await axios.post(
      "https://quizeal-backend.herokuapp.com/change-password/",
      body,
      config
    );
    dispatch(setLoading(false));
    dispatch(logout("Password Changed Successfully"));
    dispatch(setMyAlert("Password Successfully Updated, Please Login again."));
  } catch (err) {
    const error = err.response.data;
    dispatch(setLoading(false));
    console.log(error);
    dispatch(clearQuiz());
    dispatch(setMyAlert(error.detail || error.statusText));
  }
};

// DONE
export const githubProfile = () => async (dispatch) => {
  dispatch(setLoading(true));
  const team = ["daretobedifferent18", "daksh001b", "siegefried2001"];
  try {
    const resO = team.map(async (username) => {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      dispatch(setLoading(false));

      return res.data;
    });
    return await Promise.all(resO);
  } catch (error) {
    dispatch(setMyAlert(error.response.data.message));
    dispatch(setLoading(false));
  }
};

// DO AFTER DONE AT BACKEND
export const updateProfile = (formData) => async (dispatch) => {
  console.log("PROFILE UPDATED SUCCESSFULLY", formData);
};

// DO AFTER DONE AT BACKEND
export const feedback = (formData) => async (dispatch) => {
  console.log("FEEDBACK SUBMITTED SUCCESSFULLY", formData);
};

// DO AFTER DONE AT BACKEND
export const deleteAccount = (formData) => (dispatch) => {
  console.log("ACCOUNT DELETED SUCCESSFULLY");
};

// TODO
// --> Handle error handling more efficiently
