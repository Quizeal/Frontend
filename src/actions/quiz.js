import axios from 'axios';
import { setLoading } from './loading';
import { setMyAlert } from './myAlert';
import setAuthToken from '../utils/setAuthToken';
import { CLEAR_QUIZ, MY_QUIZZES_FAILURE, MY_QUIZZES_SUCCESS } from './type';

export const myQuizzes = (username) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    setAuthToken(localStorage['token-access']);
    const res = await axios.get(`/my-quizes/${username}`);
    // console.log('QUIZZES FETCHED SUCCESSFULLY', res.data.data);
    dispatch(setLoading(false));
    dispatch({
      type: MY_QUIZZES_SUCCESS,
      payload: res.data.data,
    });
    // dispatch(setMyAlert('My Quizzes'));
  } catch (error) {
    console.log('QUIZZES FETCHED FAILED', error.response);
    dispatch(setLoading(false));
    dispatch({
      type: MY_QUIZZES_FAILURE,
    });
    dispatch(
      setMyAlert(error.response.data.detail || error.response.statusText)
    );
  }
};

export const getQuiz = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/view-quiz/${id}`);
    console.log('QUIZ FETCHED SUCCESSFULLY');
    return res.data;
  } catch (error) {
    console.log('QUIZ FETCHED FAILED');
    return;
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
    console.log('QUIZ CREATED SUCCESSFULLY');
    dispatch(setLoading(false));
    dispatch(setMyAlert('Quiz Created Successfully'));
  } catch (error) {
    dispatch(setLoading(false));
    console.log('QUIZ CREATED FAILED', error.response);
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

export const clearQuiz = () => (dispatch) => {
  dispatch({
    type: CLEAR_QUIZ,
  });
};
