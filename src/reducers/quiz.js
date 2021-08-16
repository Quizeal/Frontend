import {
  MY_QUIZZES_SUCCESS,
  MY_QUIZZES_FAILURE,
  CLEAR_QUIZ,
  VIEW_QUIZ_SUCCESS,
  VIEW_QUIZ_FAILURE,
  VIEW_QUIZ_REPORT_FAILURE,
  VIEW_QUIZ_REPORT_SUCCESS,
} from '../actions/type';

const initialState = {
  quizzes: {
    attempted: [],
    created: [],
  },
  view_Quiz: null,
  view_Quiz_Report: null,
};

export default function myQuizzes(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MY_QUIZZES_SUCCESS:
      return {
        ...state,
        quizzes: payload,
      };
    case VIEW_QUIZ_FAILURE:
    case MY_QUIZZES_FAILURE:
    case VIEW_QUIZ_REPORT_FAILURE:
    case CLEAR_QUIZ:
      return {
        ...state,
        quizzes: {
          attempted: [],
          created: [],
        },
        view_Quiz: null,
        view_Quiz_Report: null,
      };
    case VIEW_QUIZ_SUCCESS:
      return {
        ...state,
        view_Quiz: payload,
      };
    case VIEW_QUIZ_REPORT_SUCCESS:
      return {
        ...state,
        view_Quiz_Report: payload,
      };
    default:
      return state;
  }
}
