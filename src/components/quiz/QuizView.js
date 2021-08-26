import { Container, Typography, Divider, Grow } from '@material-ui/core';
import QAList from './QAList';
import { Fragment } from 'react';
import { useEffect } from 'react';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewQuiz } from '../../actions/quiz';
import { useParams } from 'react-router';
import OptionsStatus from './OptionsStatus';

const QuizView = ({ viewQuiz, view_Quiz, user }) => {
  const params = useParams();

  useEffect(() => {
    viewQuiz(user.username, params.quiz_id);
  }, [params.quiz_id, user, viewQuiz]);

  return (
    <Grow in={true} timeout={1000}>
      <Container style={{ marginTop: '20px' }}>
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
          <Typography variant='h4' align='center' style={{ padding: '20px 0' }}>
            Question and Answers
          </Typography>
          <OptionsStatus />
          {view_Quiz &&
            view_Quiz.questions.map((qa, index) => {
              return <QAList view={true} key={index} i={index} qaSet={qa} />;
            })}
        </Fragment>
      </Container>
    </Grow>
  );
};

QuizView.propTypes = {
  viewQuiz: PropTypes.func.isRequired,
  view_Quiz: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  view_Quiz: state.quiz.view_Quiz,
  user: state.auth.user,
});

export default connect(mapStateToProps, { viewQuiz })(QuizView);

// TODO
// --> Verify usernames authentication
