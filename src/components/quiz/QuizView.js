import { Container, Typography, Divider } from '@material-ui/core';
import QAList from './QAList';
import { getQuiz } from '../../apiHandlers.js/quiz';
import { useState } from 'react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import Loading from '../layout/Loading';

const QuizView = (props) => {
  const { quiz_id } = props.match.params;
  const [server, setServer] = useState({ data: '', loading: true });

  const getQuizHandler = async () => {
    const res = await getQuiz(quiz_id);
    setServer({ ...server, data: res, loading: false });
  };

  const { data, loading } = server;

  useEffect(() => {
    getQuizHandler();
  }, []);

  return (
    <Container style={{ marginTop: '20px' }}>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {data ? (
            <Fragment>
              <Typography
                variant='h6'
                align='center'
                style={{ paddingBottom: '10px' }}
              >
                Quiz Name - {data.quiz_name}
              </Typography>

              <Typography
                variant='h6'
                align='center'
                style={{ paddingBottom: '10px' }}
              >
                Organizer Name - {data.username}
              </Typography>
              <Typography
                variant='h6'
                align='center'
                style={{ paddingBottom: '10px' }}
              >
                Quiz Duration - {data.duration}
              </Typography>
              <Typography
                variant='h6'
                align='center'
                style={{ paddingBottom: '10px' }}
              >
                Quiz Date - {data.date}
              </Typography>
              <Divider />
              <Typography
                variant='h4'
                align='center'
                style={{ paddingBottom: '10px' }}
              >
                Question and Answers
              </Typography>
              {data.questions.map((qa, index) => {
                return <QAList view={true} key={index} qaSet={qa} />;
              })}
            </Fragment>
          ) : (
            'No Data Found'
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default QuizView;
