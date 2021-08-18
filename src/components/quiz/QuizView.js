import { Container, Typography, Divider } from '@material-ui/core';
import QAList from './QAList';
import { Fragment } from 'react';
import { useEffect } from 'react';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewQuiz } from '../../actions/quiz';
import { useParams } from 'react-router';
import { UnAuthorized } from '../../utils/extraFunctions';

const QuizView = ({ viewQuiz, view_Quiz, isAuthenticated }) => {
  const params = useParams();

  useEffect(() => {
    viewQuiz(params.quiz_id);
  }, [params.quiz_id, viewQuiz]);

  if (!isAuthenticated) {
    return UnAuthorized('/');
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Fragment>
        <Fragment>
          <Typography
            variant='h6'
            align='center'
            style={{ paddingBottom: '10px' }}
          >
            Quiz Name - {view_Quiz && view_Quiz.quiz_name}
          </Typography>

          <Typography
            variant='h6'
            align='center'
            style={{ paddingBottom: '10px' }}
          >
            Organizer Name - {view_Quiz && view_Quiz.username}
          </Typography>
          <Typography
            variant='h6'
            align='center'
            style={{ paddingBottom: '10px' }}
          >
            Quiz Duration - {view_Quiz && view_Quiz.duration}
          </Typography>
          <Typography
            variant='h6'
            align='center'
            style={{ paddingBottom: '10px' }}
          >
            Quiz Date - {view_Quiz && view_Quiz.date}
          </Typography>
          <Divider />
          <Typography
            variant='h4'
            align='center'
            style={{ paddingBottom: '10px' }}
          >
            Question and Answers
          </Typography>
          {view_Quiz &&
            view_Quiz.questions.map((qa, index) => {
              return <QAList view={true} key={index} qaSet={qa} />;
            })}
        </Fragment>
      </Fragment>
    </Container>
  );
};

QuizView.propTypes = {
  viewQuiz: PropTypes.func.isRequired,
  view_Quiz: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  view_Quiz: state.quiz.view_Quiz,
});

export default connect(mapStateToProps, { viewQuiz })(QuizView);

// TODO
// --> Verify usernames authentication
