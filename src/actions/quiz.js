import axios from "axios";
import { setLoading } from "./loading";
import { setMyAlert } from "./myAlert";
import setAuthToken from "../utils/setAuthToken";
import {
  CLEAR_QUIZ,
  GET_QUIZ_TEST_FAILURE,
  GET_QUIZ_TEST_SUCCESS,
  MY_QUIZZES_FAILURE,
  MY_QUIZZES_SUCCESS,
  QUIZ_RESULT_FAILURE,
  QUIZ_RESULT_SUCCESS,
  VIEW_QUIZ_FAILURE,
  VIEW_QUIZ_REPORT_FAILURE,
  VIEW_QUIZ_REPORT_SUCCESS,
  VIEW_QUIZ_SUCCESS,
} from "./type";
import { shuffle } from "../utils/extraFunctions";

export const quizResult = (username, id) => async (dispatch) => {
  dispatch(setLoading(true));
  setAuthToken(localStorage["token-access"]);
  try {
    const res = await axios.get(
      `https://quizeal-backend.herokuapp.com/quiz-result/${username}/${id}`
    );
    dispatch(setLoading(false));
    dispatch({
      type: QUIZ_RESULT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch(setLoading(false));
    dispatch({
      type: QUIZ_RESULT_FAILURE,
    });
    dispatch(
      setMyAlert(error.response.data.detail || error.response.statusText)
    );
  }
};

// DONE
export const myQuizzes = (username) => async (dispatch) => {
  dispatch(setLoading(true));
  setAuthToken(localStorage["token-access"]);
  try {
    const res = await axios.get(
      `https://quizeal-backend.herokuapp.com/my-quizes/${username}`
    );
    dispatch(setLoading(false));
    dispatch({
      type: MY_QUIZZES_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch(setLoading(false));
    dispatch({
      type: MY_QUIZZES_FAILURE,
    });
    dispatch(
      setMyAlert(error.response.data.detail || error.response.statusText)
    );
  }
};

// DONE
export const viewQuiz = (username, quizId) => async (dispatch) => {
  dispatch(setLoading(true));
  setAuthToken(localStorage["token-access"]);
  try {
    const res = await axios.get(
      `https://quizeal-backend.herokuapp.com/view-quiz/${username}/${quizId}`
    );
    dispatch(setLoading(false));
    dispatch({
      type: VIEW_QUIZ_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch(setLoading(false));
    dispatch({
      type: VIEW_QUIZ_FAILURE,
    });
    dispatch(
      setMyAlert(error.response.data.detail || error.response.statusText)
    );
  }
};

// DONE
export const viewQuizReport = (id, username) => async (dispatch) => {
  dispatch(setLoading(true));
  setAuthToken(localStorage["token-access"]);
  try {
    const res = await axios.get(
      `https://quizeal-backend.herokuapp.com/quiz-report/${username}/${id}`
    );
    dispatch(setLoading(false));
    console.log("QUIZ REPORT FETCHED SUCCESSFULLY");
    dispatch({
      type: VIEW_QUIZ_REPORT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch(setLoading(false));
    dispatch({
      type: VIEW_QUIZ_REPORT_FAILURE,
    });
    dispatch(
      setMyAlert(error.response.data.detail || error.response.statusText)
    );
  }
};

// DONE
export const createQuiz = (username, quiz) => async (dispatch) => {
  dispatch(setLoading(true));
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = quiz;
  try {
    const res = await axios.post(
      `https://quizeal-backend.herokuapp.com/create-quiz/${username}`,
      body,
      config
    );
    dispatch(setLoading(false));
    dispatch(setMyAlert("Quiz Created Successfully"));
    return res.data;
  } catch (error) {
    console.log(error.response);
    dispatch(setLoading(false));
    dispatch(
      setMyAlert(error.response.data.detail || error.response.statusText)
    );
    return error.response.data;
  }
};

// DONE
export const getQuizTest = (username, id) => async (dispatch) => {
  dispatch(setLoading(true));
  setAuthToken(localStorage["token-access"]);
  try {
    let res = await axios.get(
      `https://quizeal-backend.herokuapp.com/get-quiz/${username}/${id}`
    );
    console.log("QUIZ LOADED SUCCESSFULLY");
    dispatch(setLoading(false));
    res.data.data.questions = shuffle(res.data.data.questions);
    dispatch({
      type: GET_QUIZ_TEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch(setLoading(false));
    console.log("QUIZ LOADED FAILED");
    dispatch({
      type: GET_QUIZ_TEST_FAILURE,
    });
    dispatch(
      setMyAlert(error.response.data.detail || error.response.statusText)
    );
  }
};

// DONE
export const submitQuiz = (responses, username, id) => async (dispatch) => {
  setAuthToken(localStorage["token-access"]);
  dispatch(setLoading(true));
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = responses;
  try {
    console.log(
      `https://quizeal-backend.herokuapp.com/submit-quiz/${body.username}/${id}`
    );
    const res = await axios.post(
      `https://quizeal-backend.herokuapp.com/submit-quiz/${body.username}/${id}`,
      body,
      config
    );
    dispatch(setLoading(false));

    dispatch(setMyAlert(res.data.detail));
  } catch (error) {
    dispatch(setLoading(false));
    console.log("gggg", error.response);
    // dispatch(
    //   setMyAlert(error.response.data.detail || error.response.statusText)
    // );
  }
};

// DONE
export const deleteQuiz = (username, id, type) => async (dispatch) => {
  dispatch(setLoading(true));
  setAuthToken(localStorage["token-access"]);
  try {
    let res = await axios.get(
      `https://quizeal-backend.herokuapp.com/delete-${type}/${username}/${id}`
    );
    console.log(`QUIZ ${type} DELETED SUCCESSFULLY`);
    dispatch(setLoading(false));
    dispatch(setMyAlert(res.data.data));
    dispatch(myQuizzes(username));
  } catch (error) {
    dispatch(setLoading(false));
    console.log("QUIZ DELETED FAILED", error.response);
    dispatch(
      setMyAlert(error.response.data.detail || error.response.statusText)
    );
  }
};

// DONE
export const clearQuiz = () => (dispatch) => {
  dispatch({
    type: CLEAR_QUIZ,
  });
};
