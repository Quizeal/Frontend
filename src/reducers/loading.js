import { LOADIND_STATUS } from '../actions/type';

const initialState = false;

export default function myQuizzes(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADIND_STATUS:
      return payload;
    default:
      return state;
  }
}
