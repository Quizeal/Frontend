import React, { Fragment } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Grow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MySnackbar from '../layout/MySnackbar';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon style={{ fontSize: '5.5vw' }} />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon style={{ fontSize: '5.5vw' }} />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon style={{ fontSize: '5.5vw' }} />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon style={{ fontSize: '5.5vw' }} />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon style={{ fontSize: '5.5vw' }} />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Feedback = () => {
  const [form, setForm] = React.useState({
    answer: '',
    rating: '2',
    likeness: '2',
  });
  const classes = useStyles();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    console.log(form);
  };
  return (
    <div>
      <Fragment>
        <Grow in={true} timeout={500}>
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography variant='h4'>Will you Come back?</Typography>
              <Rating
                name='likeness'
                defaultValue={form.likeness}
                size='large'
                onChange={(e) => onChange(e)}
                getLabelText={(value) => customIcons[value].label}
                IconContainerComponent={IconContainer}
              />
              <Typography variant='h4'>
                How will you rate our website?
              </Typography>
              <Rating
                value={form.rating}
                name='rating'
                style={{ fontSize: '5.5vw' }}
                onChange={(e) => onChange(e)}
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                minRows={3}
                multiline
                name='answer'
                onChange={(e) => onChange(e)}
                label='Explain your Answer'
              />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={submit}
              >
                Submit
              </Button>
            </div>
          </Container>
        </Grow>
        <MySnackbar alert={alert} />
      </Fragment>
    </div>
  );
};

export default Feedback;
