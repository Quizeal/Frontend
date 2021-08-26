import axios from 'axios';
import { setLoading } from './loading';
import { setMyAlert } from './myAlert';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_QUIZ,
  GET_QUIZ_TEST_FAILURE,
  GET_QUIZ_TEST_SUCCESS,
  MY_QUIZZES_FAILURE,
  MY_QUIZZES_SUCCESS,
  VIEW_QUIZ_FAILURE,
  VIEW_QUIZ_REPORT_FAILURE,
  VIEW_QUIZ_REPORT_SUCCESS,
  VIEW_QUIZ_SUCCESS,
} from './type';
import { shuffle } from '../utils/extraFunctions';

// DONE
export const myQuizzes = (username) => async (dispatch) => {
  dispatch(setLoading(true));
  setAuthToken(localStorage['token-access']);
  try {
    const res = await axios.get(`/my-quizes/${username}`);
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
  setAuthToken(localStorage['token-access']);
  try {
    const res = await axios.get(`/view-quiz/${username}/${quizId}`);
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
  setAuthToken(localStorage['token-access']);
  try {
    const res = await axios.get(`/quiz-report/${username}/${id}`);
    dispatch(setLoading(false));
    console.log('QUIZ REPORT FETCHED SUCCESSFULLY');
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
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(quiz);
  try {
    await axios.post(`/create-quiz/${username}`, body, config);
    dispatch(setLoading(false));
    dispatch(setMyAlert('Quiz Created Successfully'));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      setMyAlert(error.response.data.detail || error.response.statusText)
    );
    return;
  }
};

// DONE
export const getQuizTest = (username, id) => async (dispatch) => {
  dispatch(setLoading(true));
  setAuthToken(localStorage['token-access']);
  try {
    let res = await axios.get(`/get-quiz/${username}/${id}`);
    console.log('QUIZ LOADED SUCCESSFULLY');
    dispatch(setLoading(false));
    res.data.data.questions = shuffle(res.data.data.questions);
    dispatch({
      type: GET_QUIZ_TEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch(setLoading(false));
    console.log('QUIZ LOADED FAILED');
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
  setAuthToken(localStorage['token-access']);
  dispatch(setLoading(true));
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(responses);
  try {
    const res = await axios.post(
      `/submit-quiz/${username}/${id}`,
      body,
      config
    );
    dispatch(setLoading(false));
    dispatch(setMyAlert(res.data.detail));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      setMyAlert(error.response.data.detail || error.response.statusText)
    );
  }
};

// DONE
export const deleteQuiz = (username, id, type) => async (dispatch) => {
  dispatch(setLoading(true));
  setAuthToken(localStorage['token-access']);
  try {
    let res = await axios.get(`/delete-${type}/${username}/${id}`);
    console.log('QUIZ DELETED SUCCESSFULLY');
    dispatch(setLoading(false));
    dispatch(setMyAlert(res.data.detail));
    dispatch(myQuizzes(username));
  } catch (error) {
    dispatch(setLoading(false));
    console.log('QUIZ DELETED FAILED', error.response);
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
