import { MY_QUIZZES_SUCCESS, MY_QUIZZES_FAILURE } from '../actions/type';

const initialState = {
  quizzes: {
    attempted: [],
    created: [],
  },
};

export default function myQuizzes(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MY_QUIZZES_SUCCESS:
      return {
        ...state,
        quizzes: payload,
      };
    case MY_QUIZZES_FAILURE:
      return {
        ...state,
        quizzes: null,
      };
    default:
      return state;
  }
}
