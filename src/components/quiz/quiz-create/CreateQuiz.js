import React, { Fragment, useEffect, useState } from 'react';
import { Grid, TextField, Divider, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { format, isFuture, isValid } from 'date-fns';
import {
  KeyboardTimePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import QAList from '../QAList';
import AddQuestion from './AddQuestion';
import MySnackbar from '../../layout/MySnackbar';
// import { createQuiz } from '../../../apiHandlers.js/quiz';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createQuiz } from '../../../actions/quiz';
import { useHistory } from 'react-router';
import { UnAuthorized } from '../../../utils/extraFunctions';

const useStyles = makeStyles((theme) => ({
  sectionDetail: {
    padding: '20px',
    paddingBottom: 0,
    maxWidth: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  divider: {
    margin: '20px',
  },
  section1: {
    display: 'flex',
  },
  alert: {
    margin: '20px',
  },
}));

const CreateQuiz = ({ user, isAuthenticated, createQuiz }) => {
  const history = useHistory();
  const classes = useStyles();
  const [selectedDateTime, handleDateTimeChange] = useState(null);
  const [selectedDuration, handleDurationChange] = useState(null);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ status: false, msg: '' });

  const [newQuiz, updateQuiz] = useState({
    quiz_name: '',
    questions: [],
  });

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

  const onChange = (e) =>
    updateQuiz({ ...newQuiz, [e.target.name]: e.target.value });

  const deleteQuestion = (id) => {
    const newQuestionsArray = [...newQuiz.questions];

    newQuestionsArray.splice(
      newQuestionsArray.findIndex((a) => a.id === id),
      1
    );
    updateQuiz({
      ...newQuiz,
      questions: newQuestionsArray,
    });
    setAlert({
      ...alert,
      status: true,
      msg: 'Question deleted successfully!',
    });
  };

  const addQuestion = (question) => {
    const presentQuestions = newQuiz.questions;
    updateQuiz({
      ...newQuiz,
      [newQuiz.questions]: presentQuestions.push(question),
    });
  };

  const onSubmit = async () => {
    const { quiz_name, questions } = newQuiz;
    if (!quiz_name || !selectedDuration || !selectedDateTime) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Please fill the required fields',
      });
      return;
    }
    if (!isValid(selectedDuration)) {
      setAlert({ ...alert, status: true, msg: 'Invalid Time Format' });
      return;
    }
    if (!isValid(selectedDateTime) || !isFuture(selectedDateTime)) {
      setAlert({ ...alert, status: true, msg: 'Invalid Date Time Format' });
      return;
    }
    if (!questions.length > 0) {
      setAlert({ ...alert, status: true, msg: 'Please add Questions' });
      return;
    }
    questions.forEach((e) => {
      delete e.id;
    });

    const date_time = {
      date: format(selectedDateTime, 'yyy-MM-dd'),
      start_time: format(selectedDateTime, 'HH:mm'),
      duration: format(selectedDuration, 'HH:mm:ss'),
    };
    await createQuiz({
      ...newQuiz,
      username: user.username,
      ...date_time,
    });
    history.push('/dashboard');
  };
  const { questions, quiz_name } = newQuiz;

  useEffect(() => {
    document.title = 'Quizeal | Create Quiz';
  }, []);

  if (!isAuthenticated) {
    return UnAuthorized('/');
  }

  return (
    <Fragment>
      <Grid
        container
        spacing={5}
        className={classes.sectionDetail}
        justifyContent='center'
      >
        <Grid item>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='quiz_name'
            label='Quiz Name'
            name='quiz_name'
            autoFocus
            value={quiz_name}
            onChange={(e) => onChange(e)}
          />
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              ampm={false}
              openTo='hours'
              views={['minutes', 'seconds']}
              format='mm:ss'
              required
              inputVariant='outlined'
              label='Quiz Duration'
              value={selectedDuration}
              onChange={handleDurationChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              inputVariant='outlined'
              ampm={false}
              label='Quiz Date and Time'
              value={selectedDateTime}
              required
              onChange={handleDateTimeChange}
              onError={console.log}
              disablePast
              format='dd/MM/yyy HH:mm'
              minDateMessage='Invalid Date Time Format.'
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Divider variant='middle' className={classes.divider} />
      <Grid container justifyContent='space-around' style={{ gap: '10px' }}>
        <ButtonGroup
          color='primary'
          variant='contained'
          aria-label='outlined secondary button group'
        >
          <Button onClick={handleClickOpenDialog}>Show Questions Added</Button>
          <Button>Questions Added - {questions.length}</Button>
        </ButtonGroup>
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={onSubmit}
        >
          Create Quiz
        </Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {questions.length ? 'Questions Added' : 'No Question Added'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {questions.map((qa, index) => {
              return (
                <QAList
                  key={index}
                  number={index}
                  deleteQuestion={deleteQuestion}
                  edit={true}
                  qaSet={qa}
                  view={true}
                />
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Divider variant='middle' className={classes.divider} />
      <Grid container justifyContent='center'>
        <AddQuestion addQuestion={addQuestion} />
      </Grid>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
};

CreateQuiz.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  createQuiz: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { createQuiz })(CreateQuiz);

// TODO
// --> Handle Console errors by ForwardRef
// --> Verify usernames authentication
// --> Add Question Type Option in forms
