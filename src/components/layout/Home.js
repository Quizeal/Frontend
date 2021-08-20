import React, { Fragment, useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import home from '../../resources/home.gif';
import MySnackbar from './MySnackbar';
import { Grow } from '@material-ui/core';

// REDUC
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(10),
    maxWidth: '100%',
    rowGap: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6),
      rowGap: theme.spacing(5),
    },
  },
}));

const Home = ({ isAuthenticated }) => {
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

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Grid container justifyContent='center' className={classes.section}>
        <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
          <Grid item xs={12} md={6} container>
            <Grid
              container
              justifyContent='flex-start'
              style={{ gridGap: '20px', flexDirection: 'column' }}
            >
              <Grid style={{ display: 'flex', alignItems: 'baseline' }}>
                {/* <img src={logo} alt='logo' width='20%' /> */}
                <Typography
                  variant='h1'
                  style={{ textTransform: 'uppercase' }}
                  className='gradientText'
                >
                  Quizeal
                </Typography>
              </Grid>
              <Typography variant='h3'>
                The ultimate Quiz taking platform for the present times.
              </Typography>
              <Link
                to='/signup'
                style={{ maxWidth: 'max-content' }}
                className={'styleLink'}
              >
                <Button variant='contained' color='primary'>
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
                  id='outlined-basic'
                  label='Add Quiz Code'
                  variant='outlined'
                  value={quizCode}
                  onChange={(e) => onChange(e)}
                  size='small'
                />
                <IconButton
                  color='primary'
                  aria-label='add to shopping cart'
                  disabled={!Boolean(quizCode)}
                  onClick={goToQuiz}
                >
                  <SendIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Grow>
        <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={2000}>
          <Grid item xs={12} md={6} justifyContent='center' container>
            <img src={home} alt='home' width='85%'></img>
          </Grid>
        </Grow>
      </Grid>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
