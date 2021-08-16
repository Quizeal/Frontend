import {
  MY_QUIZZES_SUCCESS,
  MY_QUIZZES_FAILURE,
  CLEAR_QUIZ,
} from '../actions/type';

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
    case CLEAR_QUIZ:
      return {
        ...state,
        quizzes: {
          attempted: [],
          created: [],
        },
      };
    default:
      return state;
  }
}
