import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Typography,
  TextField,
  IconButton,
  Grow,
  makeStyles,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
// import home from '../../resources/home.gif';
import MySnackbar from '../layout/MySnackbar';

// REDUC
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(10),
    maxWidth: '100%',
    rowGap: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4),
      rowGap: theme.spacing(5),
    },
  },
}));

const Home = ({ auth: { isAuthenticated, user } }) => {
  const classes = useStyles();
  const history = useHistory();
  const [quizCode, setQuizCode] = useState('');
  const [alert, setAlert] = React.useState({ status: false, msg: '' });

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

  const onChange = (e) => {
    setQuizCode(e.target.value);
  };

  const goToQuiz = () => {
    if (quizCode.length < 5) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Invalid code or you might be not signed in with correct account',
      });
      return;
    }
    history.push(`/quiz/${quizCode}`);
  };

  useEffect(() => {
    document.title = 'Quizeal | Home';
  }, []);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Grid container justifyContent="center" className={classes.section}>
        <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
          <Grid item xs={12} md={6} container>
            <Grid
              container
              justifyContent="flex-start"
              style={{ gridGap: '20px', flexDirection: 'column' }}
            >
              <Grid style={{ display: 'flex', alignItems: 'baseline' }}>
                {/* <img src={logo} alt='logo' width='20%' /> */}
                <Typography
                  variant="h1"
                  style={{ textTransform: 'uppercase' }}
                  className="gradient-text"
                >
                  Quizeal
                </Typography>
              </Grid>
              <Typography variant="h3">
                The ultimate Quiz taking platform for the present times.
              </Typography>
              <Link
                to="/signup"
                style={{ maxWidth: 'max-content' }}
                className={'style-link'}
              >
                <Button variant="contained" color="primary">
                  Get Started
                </Button>
              </Link>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Add Quiz Code"
                  variant="outlined"
                  value={quizCode}
                  onChange={(e) => onChange(e)}
                  size="small"
                />
                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  disabled={!quizCode}
                  onClick={goToQuiz}
                >
                  <SendIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Grow>
        <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={2000}>
          <Grid item xs={12} md={6} justifyContent="center" container>
            <img
              src="/static/images/illustrations/home.png"
              alt="home"
              width="85%"
            ></img>
          </Grid>
        </Grow>
      </Grid>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
};

Home.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
