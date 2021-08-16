import axios from 'axios';
import { setLoading } from './loading';
import { setMyAlert } from './myAlert';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_QUIZ,
  MY_QUIZZES_FAILURE,
  MY_QUIZZES_SUCCESS,
  VIEW_QUIZ_FAILURE,
  VIEW_QUIZ_SUCCESS,
} from './type';

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
export const viewQuiz = (quizId) => async (dispatch) => {
  dispatch(setLoading(true));
  setAuthToken(localStorage['token-access']);
  try {
    const res = await axios.get(`/view-quiz/${quizId}`);
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

export const getQuizReport = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username: 'divyam' });
  try {
    const res = await axios.post(`/quiz-report/${id}`, body, config);
    console.log('QUIZ REPORT FETCHED SUCCESSFULLY');
    return res.data;
  } catch (error) {
    console.log('QUIZ REPORT FETCHED FAILED', error);
    return;
  }
};

// DONE
export const createQuiz = (quiz) => async (dispatch) => {
  dispatch(setLoading(true));
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(quiz);
  try {
    await axios.post(`/create-quiz/`, body, config);
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

export const getQuizTest = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/get-quiz/${id}`);
    console.log('QUIZ LOADED SUCCESSFULLY');
    return res.data;
  } catch (error) {
    console.log('QUIZ LOADED FAILED', error);
    return { msg: 'Data Not Found' };
  }
};

export const submitQuiz = (responses, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(responses);
  console.log(body);
  try {
    const res = await axios.post(`/submit-quiz/${id}`, body, config);
    console.log('QUIZ SUBMITTED SUCCESSFULLY');
    return res.data;
  } catch (error) {
    console.log('QUIZ SUBMITTED FAILED', error);
  }
};

// DONE
export const clearQuiz = () => (dispatch) => {
  dispatch({
    type: CLEAR_QUIZ,
  });
};
