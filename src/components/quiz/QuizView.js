import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Typography, Divider, Grow } from '@material-ui/core';
import QAList from './QAList';
import OptionsStatus from './OptionsStatus';
import InfoCard from '../layout/InfoCard';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewQuiz } from '../../actions/quiz';
import moment from 'moment';

const QuizView = ({ viewQuiz, view_Quiz, user, loading }) => {
  const params = useParams();

  useEffect(() => {
    viewQuiz(user && user.username, params.quiz_id);
  }, [params.quiz_id, user, viewQuiz]);

  return (
    <Fragment>
      {!loading ? (
        view_Quiz ? (
          <Grow in={true} timeout={1000}>
            <Container style={{ marginTop: '20px' }}>
              <Fragment>
                <Typography
                  variant="h6"
                  align="center"
                  style={{ paddingBottom: '10px' }}
                >
                  Quiz Name - {view_Quiz && view_Quiz.quiz_name}
                </Typography>

                <Typography
                  variant="h6"
                  align="center"
                  style={{ paddingBottom: '10px' }}
                >
                  Organizer Name - {view_Quiz && view_Quiz.username}
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  style={{ paddingBottom: '10px' }}
                >
                  Quiz Duration -{' '}
                  {view_Quiz &&
                    moment.utc(+view_Quiz.duration * 1000).format('HH:mm:ss')}
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  style={{ paddingBottom: '10px' }}
                >
                  Quiz Date - {view_Quiz && view_Quiz.date}
                </Typography>
                <Divider />
                <Typography
                  variant="h4"
                  align="center"
                  style={{ padding: '20px 0' }}
                >
                  Question and Answers
                </Typography>
                <OptionsStatus />
                {view_Quiz &&
                  view_Quiz.questions.map((qa, index) => {
                    return (
                      <QAList view={true} key={index} i={index} qaSet={qa} />
                    );
                  })}
              </Fragment>
            </Container>
          </Grow>
        ) : (
          <InfoCard
            msg={`Quiz does not exists.`}
            detail={`Invalid Quiz Code or you might not signed in with correct account.`}
            // buttons={buttons[quizSelected]}
            gif="noData.gif"
          />
        )
      ) : (
        ''
      )}
    </Fragment>
  );
};

QuizView.propTypes = {
  viewQuiz: PropTypes.func.isRequired,
  view_Quiz: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  view_Quiz: state.quiz.view_Quiz,
  user: state.auth.user,
  loading: state.loading,
});

export default connect(mapStateToProps, { viewQuiz })(QuizView);
