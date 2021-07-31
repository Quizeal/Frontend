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

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('https://reqres.in/api/users/2');
    console.log('USER LOADED SUCCESSFULLY');
    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (error) {
    console.log('USER LOADED FAILED');
    dispatch({
      type: AUTH_FAILURE,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    // Dummy API
    const res = await axios.post('https://reqres.in/api/login', body, config);
    console.log('LOGIN SUCCESSFULLY');
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('LOGIN FAILED');
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

export const signup = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    // Dummy API
    const res = await axios.post(
      'https://reqres.in/api/register',
      body,
      config
    );
    console.log('SIGNUP SUCCESSFULLY');
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('SIGNUP FAILED');
    dispatch({
      type: SIGNUP_FAILURE,
    });
  }
};

export const logout = () => (dispatch) => {
  console.log('LOGOUT SUCCESSFULLY');
  dispatch({
    type: LOGOUT,
  });
};
