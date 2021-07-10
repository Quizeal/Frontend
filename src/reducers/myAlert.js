import { SET_MYALERT, REMOVE_MYALERT } from '../actions/type';

const initialState = [];

export default function myAlertReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MYALERT:
      if (state.length > 0) {
        return state;
      }
      return [...state, payload];
    case REMOVE_MYALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
