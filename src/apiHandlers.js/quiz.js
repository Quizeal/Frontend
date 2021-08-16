import axios from 'axios';

export const myQuizzes = async () => {
  const user_name = 'divyam';
  try {
    const res = await axios.get(`/my-quizes/${user_name}`);
    console.log('QUIZZES FETCHED SUCCESSFULLY');
    return res.data;
  } catch (error) {
    console.log('QUIZZES FETCHED FAILED');
    return;
  }
};

export const getQuiz = async (id) => {
  try {
    const res = await axios.get(`/view-quiz/${id}`);
    console.log('QUIZ FETCHED SUCCESSFULLY');
    return res.data;
  } catch (error) {
    console.log('QUIZ FETCHED FAILED');
    return;
  }
};

export const getQuizReport = async (id) => {
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

export const createQuiz = async (quiz) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(quiz);
  try {
    const res = await axios.post(`/create-quiz/`, body, config);
    console.log('QUIZ CREATED SUCCESSFULLY');
    return res.data;
  } catch (error) {
    console.log('QUIZ CREATED FAILED', error);
    return;
  }
};

export const getQuizTest = async (id) => {
  try {
    const res = await axios.get(`/get-quiz/${id}`);
    console.log('QUIZ LOADED SUCCESSFULLY');
    return res.data;
  } catch (error) {
    console.log('QUIZ LOADED FAILED', error);
    return { msg: 'Data Not Found' };
  }
};

export const submitQuiz = async (responses, id) => {
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