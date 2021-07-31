import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_FAILURE,
  USER_LOADED,
  LOGOUT,
} from '../actions/type';

const initial_state = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  loading: true,
  user: null,
};

export default function auth(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
    case AUTH_FAILURE:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
}
