import React, { Fragment, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  ButtonGroup,
  Grid,
  Divider,
  TextField,
  Fab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import AddOption from './AddOption';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@material-ui/icons/Add';
import { setMyAlert } from '../../../actions/myAlert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MySnackbar from '../../layout/MySnackbar';

const questionType = [
  {
    value: 1,
    label: 'Single Correct',
  },
  {
    value: 2,
    label: 'Multi Correct',
  },
];
// Customized Styling of Material UI Components
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '60vw',
    minWidth: '45vw',
    [theme.breakpoints.down('xs')]: { maxWidth: '100vh' },
    textTransform: 'unset',
  },
  qActionStyle: {
    justifyContent: 'end',
  },
  oActionStyle: {
    justifyContent: 'start',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 145,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  deleteOption: {
    cursor: 'pointer',
    marginLeft: '10px',
  },
}));

const AddQuestion = ({ setMyAlert, ...props }) => {
  const classes = useStyles();
  const [alert, setAlert] = useState({ status: false, msg: '' });
  const [questionDetails, updateQuestionDetails] = useState({
    id: uuidv4(),
    question_name: '',
    options: [
      {
        id: uuidv4(),
        option_name: '',
        is_correct: false,
      },
    ],
    optionsCount: 1,
    question_marks: 1,
    question_type: 1,
  });

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

  const onChange = (e) => {
    updateQuestionDetails({
      ...questionDetails,
      [e.target.name]: e.target.value,
    });
  };
  const updateOption = (e, detail) => {
    const newOptionsArray = [...questionDetails.options];
    if (detail === 'toggleAnswer')
      newOptionsArray[e.target.name].is_correct = e.target.checked;
    else newOptionsArray[e.target.name].option_name = e.target.value;
    updateQuestionDetails({ ...questionDetails, options: newOptionsArray });
  };

  const clearQuestionDetails = () => {
    updateQuestionDetails({
      ...questionDetails,
      id: uuidv4(),
      question_name: '',
      options: [{ option_name: '', is_correct: false }],
      optionsCount: 1,
      question_marks: 1,
      question_type: 1,
    });
  };

  const deleteOption = (id) => {
    if (questionDetails.optionsCount > 1) {
      const newOptionsArray = [...questionDetails.options];
      const presentOptionCount = questionDetails.optionsCount;

      newOptionsArray.splice(
        newOptionsArray.findIndex((a) => a.id === id),
        1
      );
      updateQuestionDetails({
        ...questionDetails,
        options: newOptionsArray,
        optionsCount: presentOptionCount - 1,
      });
    }
  };

  const addOption = () => {
    if (questionDetails.optionsCount < 5) {
      const newOptionsArray = [...questionDetails.options];
      const presentOptionCount = questionDetails.optionsCount;
      const newOption = { id: uuidv4(), option_name: '', is_correct: false };
      newOptionsArray.push(newOption);

      updateQuestionDetails({
        ...questionDetails,
        options: newOptionsArray,
        optionsCount: presentOptionCount + 1,
      });
    }
  };
  const onSubmit = () => {
    const { question_name, options } = questionDetails;
    if (!question_name) {
      setAlert({ ...alert, status: true, msg: 'Please fill question Details' });
      return;
    }
    if (!options.every((o) => o.option_name !== '')) {
      setAlert({ ...alert, status: true, msg: 'Please fill all options' });
      return;
    }
    if (!options.some((o) => o.is_correct === true)) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Please mark the correct answer',
      });
      return;
    }
    options.forEach((o) => delete o.id);
    props.addQuestion({ ...questionDetails, options: options });
    console.log({ ...questionDetails, options: options });
    clearQuestionDetails();
    setAlert({
      ...alert,
      status: true,
      msg: 'Question added successfully!',
    });
  };

  const {
    question_name,
    options,
    optionsCount,
    question_marks,
    question_type,
  } = questionDetails;
  return (
    <Fragment>
      <Card>
        <CardContent>
          <TextField
            id='outlined-basic'
            label='Question'
            variant='outlined'
            multiline
            name='question_name'
            value={question_name}
            fullWidth={true}
            onChange={(e) => onChange(e)}
          />
        </CardContent>
        <Divider variant='middle' />
        <CardActions
          style={{ justifyContent: 'space-between', alignItems: 'start' }}
        >
          <Fab
            size='medium'
            color='primary'
            aria-label='add'
            onClick={addOption}
            variant='extended'
          >
            Add Option
            <AddIcon />
          </Fab>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <TextField
              id='basic'
              size='small'
              label='Question Marks'
              variant='outlined'
              name='question_marks'
              type='number'
              value={question_marks}
              onChange={(e) => onChange(e)}
            />
            <TextField
              id='outlined-select-currency-native'
              select
              label='Question Type'
              name='question_type'
              value={question_type}
              size='small'
              onChange={(e) => onChange(e)}
              SelectProps={{
                native: true,
              }}
              variant='outlined'
            >
              {questionType.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>
        </CardActions>
        <Grid container className={classes.root} justifyContent='center'>
          {options.map((option, index) => {
            return (
              <AddOption
                key={index}
                number={index}
                option={option}
                updateOption={updateOption}
                deleteOption={deleteOption}
                count={optionsCount}
              />
            );
          })}
        </Grid>
        <Divider variant='middle' />
        <CardActions className={classes.qActionStyle}>
          <ButtonGroup
            variant='contained'
            color='primary'
            aria-label='contained primary button group'
          >
            <Button onClick={onSubmit}>Add</Button>
            <Button onClick={clearQuestionDetails}>Clear</Button>
          </ButtonGroup>
        </CardActions>
      </Card>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
};

AddQuestion.propTypes = {
  setMyAlert: PropTypes.func.isRequired,
};

export default connect(null, { setMyAlert })(AddQuestion);
