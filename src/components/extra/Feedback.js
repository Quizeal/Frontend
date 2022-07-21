import React, { Fragment, useEffect } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  Grow,
  makeStyles,
} from '@material-ui/core';
import MySnackbar from '../layout/MySnackbar';
import Rating from '@mui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { feedback } from '../../actions/auth';

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
  divider: {
    margin: theme.spacing(3),
  },
  section: {
    padding: theme.spacing(2),
    maxWidth: '100%',
    rowGap: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4),
      rowGap: theme.spacing(5),
    },
  },
}));

const Feedback = ({ feedback }) => {
  const [form, setForm] = React.useState({
    answer: '',
    rating: 2,
    likeness: '2',
  });
  const classes = useStyles();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    feedback(form);
  };

  useEffect(() => {
    document.title = 'Quizeal | Feedback';
  }, []);
  return (
    <div>
      <Fragment>
        <Grow in={true} timeout={1000}>
          <Grid
            container
            component="main"
            className={classes.section}
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                We would like your feedback to improve our website.
              </Typography>
            </Grid>
            {/* <Divider className={classes.divider} /> */}
            <CssBaseline />
            <Grid sm={8} md={5} item justifyContent="center">
              <img
                src="/static/images/illustrations/feedback.png"
                alt="feedback"
                width="100%"
              ></img>
            </Grid>
            <Grid item>
              <Grow in={true} timeout={2000}>
                <div className={classes.paper}>
                  <Typography variant="h5" align="center">
                    Will you Come back?
                  </Typography>
                  <Rating
                    name="likeness"
                    defaultValue={form.likeness}
                    size="large"
                    onChange={(e) => onChange(e)}
                    getLabelText={(value) => customIcons[value].label}
                    IconContainerComponent={IconContainer}
                  />
                  <Typography variant="h5" align="center">
                    How will you rate our website?
                  </Typography>
                  <Rating
                    value={form.rating}
                    name="rating"
                    style={{ fontSize: '5.5vw' }}
                    onChange={(e) => onChange(e)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    minRows={3}
                    multiline
                    name="answer"
                    onChange={(e) => onChange(e)}
                    label="Explain your Answer"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={submit}
                  >
                    Submit
                  </Button>
                </div>
              </Grow>
            </Grid>
          </Grid>
        </Grow>
        <MySnackbar alert={alert} />
      </Fragment>
    </div>
  );
};

Feedback.propTypes = {
  feedback: PropTypes.func.isRequired,
};

export default connect(null, { feedback })(Feedback);

// TODO
// --> Need to be implemented at backend
