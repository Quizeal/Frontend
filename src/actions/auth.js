import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_LOADED,
  AUTH_FAILURE,
  LOGOUT,
} from '../actions/type';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import { setMyAlert } from './myAlert';
import { setLoading } from './loading';
import { clearQuiz } from './quiz';

let AccessTimer = null;

// Refresh and access token both are updated.
// Pls fix at backend to update and blacklist only access-token
const accessToken = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const tokenRefresh = localStorage['token-refresh'];
  if (!tokenRefresh) {
    return console.log("ACCESS TOKEN COULDN'T FOUND", tokenRefresh);
  }
  const body = JSON.stringify({ refresh: tokenRefresh });
  try {
    const res = await axios.post('/token-refresh/', body, config);
    console.log('ACCESS TOKEN REFRESH SUCCESS');

    const { access, refresh } = res.data;
    localStorage['token-access'] = access;
    localStorage['token-refresh'] = refresh;

    setAuthToken(access);
  } catch (error) {
    console.log('ACCESS TOKEN REFRESH FAILED', error.response);
  }
};

// Add Error Handling
export const loadUser = () => async (dispatch) => {
  const tokenAccess = localStorage['token-access'];

  if (tokenAccess) {
    dispatch(setLoading(true));
    setAuthToken(tokenAccess);
  } else return;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ token: tokenAccess });
  try {
    const res = await axios.post('/load-user/', body, config);
    console.log('USER LOADED SUCCESSFULLY');
    dispatch(setLoading(false));
    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
    AccessTimer = setInterval(accessToken(), 1000 * 60 * 60);
  } catch (error) {
    dispatch(setLoading(false));
    console.log('USER LOADED FAILED');
    dispatch({
      type: AUTH_FAILURE,
    });
    dispatch(clearQuiz());
  }
};

// Done
export const login = (username, password) => async (dispatch) => {
  dispatch(setLoading(true));
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post('/login/', body, config);
    dispatch(setLoading(false));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setMyAlert('Login Successfully'));
  } catch (err) {
    dispatch(setLoading(false));
    const error = err.response;
    dispatch({
      type: LOGIN_FAILURE,
    });
    dispatch(clearQuiz());

    dispatch(setMyAlert(error.data.detail || error.statusText));
  }
};

// Done
export const signup = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post('/register/', body, config);
    dispatch(setLoading(false));
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(setMyAlert('Signup Successfully, Please login to continue.'));
  } catch (err) {
    const error = err.response.data;
    dispatch(setLoading(false));
    dispatch({
      type: SIGNUP_FAILURE,
    });
    dispatch(clearQuiz());
    dispatch(setMyAlert(error.username));
  }
};

// Add Logout API at backend and update this function
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  clearInterval(AccessTimer);
  dispatch(clearQuiz());
  dispatch(setMyAlert('Logout Successfully'));
};
