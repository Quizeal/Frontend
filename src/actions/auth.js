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

let AccessTimer = null;

// Refresh and access token both are updated.
// Pls fix at backend to update and blacklist only access-token
export const accessToken = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const tokenRefresh = localStorage['token-refresh'];
  if (!tokenRefresh) {
    return console.log('ACCESS TOKEN FAILED', tokenRefresh);
  }
  const body = JSON.stringify({ refresh: tokenRefresh });
  try {
    const res = await axios.post('/token-refresh/', body, config);
    console.log('ACCESS TOKEN SUCCESS');

    const { access, refresh } = res.data;
    localStorage['token-access'] = access;
    localStorage['token-refresh'] = refresh;

    setAuthToken(access);
  } catch (error) {
    console.log('ACCESS TOKEN FAILED');
  }
};

// Add Error Handling
export const loadUser = () => async (dispatch) => {
  const tokenAccess = localStorage['token-access'];

  if (tokenAccess) {
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
    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
    AccessTimer = setInterval(accessToken(), 1000 * 60 * 60);
  } catch (error) {
    console.log('USER LOADED FAILED');
    dispatch({
      type: AUTH_FAILURE,
    });
  }
};

// Done
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post('/login/', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setMyAlert('Login Successfully'));
  } catch (err) {
    const error = err.response.data;
    dispatch({
      type: LOGIN_FAILURE,
    });
    dispatch(setMyAlert(error.detail));
  }
};

// Done
export const signup = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  console.log(body);
  try {
    const res = await axios.post('/register/', body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(setMyAlert('Signup Successfully, Please login to continue.'));
  } catch (err) {
    const error = err.response.data;
    dispatch({
      type: SIGNUP_FAILURE,
    });
    dispatch(setMyAlert(error.username));
  }
};

// Add Logout API at backend and update this function
export const logout = () => (dispatch) => {
  console.log('LOGOUT SUCCESSFULLY');
  dispatch({
    type: LOGOUT,
  });
  clearInterval(AccessTimer);
  dispatch(setMyAlert('Logout Successfully'));
};
