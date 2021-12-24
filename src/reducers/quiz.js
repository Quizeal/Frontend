import {
  MY_QUIZZES_SUCCESS,
  MY_QUIZZES_FAILURE,
  CLEAR_QUIZ,
  VIEW_QUIZ_SUCCESS,
  VIEW_QUIZ_FAILURE,
  VIEW_QUIZ_REPORT_FAILURE,
  VIEW_QUIZ_REPORT_SUCCESS,
  GET_QUIZ_TEST_SUCCESS,
  GET_QUIZ_TEST_FAILURE,
  QUIZ_RESULT_FAILURE,
  QUIZ_RESULT_SUCCESS,
} from "../actions/type";

const initialState = {
  quizzes: {
    attempted: [],
    created: [],
  },
  view_Quiz: null,
  view_Quiz_Report: null,
  get_Quiz_Test: null,
  get_quiz_result: null,
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
    case GET_QUIZ_TEST_FAILURE:
    case QUIZ_RESULT_FAILURE:
    case CLEAR_QUIZ:
      return {
        ...state,
        quizzes: {
          attempted: [],
          created: [],
        },
        view_Quiz: null,
        view_Quiz_Report: null,
        get_Quiz_Test: null,
        get_quiz_result: null,
      };
    case QUIZ_RESULT_SUCCESS:
      return {
        ...state,
        get_quiz_result: payload,
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
    case GET_QUIZ_TEST_SUCCESS:
      return {
        ...state,
        get_Quiz_Test: payload,
      };
    default:
      return state;
  }
}
