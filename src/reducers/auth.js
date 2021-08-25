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
  // token: localStorage.getItem('token-access'),
  loading: true,
  user: null,
  statusCode: null,
  // loadUserSuccess: false,
};

export default function auth(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
        // loadUserSuccess: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token-refresh', payload.refresh);
      localStorage.setItem('token-access', payload.access);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
    case AUTH_FAILURE:
    case LOGOUT:
      localStorage.removeItem('token-refresh');
      localStorage.removeItem('token-access');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
