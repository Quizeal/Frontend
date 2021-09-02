import React, { useEffect, Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import {
  Divider,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Grow,
  makeStyles,
} from '@material-ui/core';
import logo from '../../resources/logo.png';
import MySnackbar from '../layout/MySnackbar';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../../actions/auth';
import InfoCard from '../layout/InfoCard';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = ({ signup, auth, props }) => {
  const history = useHistory();
  const classes = useStyles();
  const [form, setForm] = useState({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    confirmPassword: null,
    username: null,
  });

  const [signUp, setSignUp] = useState({ status: false });
  const [alert, setAlert] = useState({ status: false, msg: '' });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

  const onSubmit = async () => {
    // Validations
    const {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      username,
    } = form;
    var pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    if (!username || !email || !password || !first_name) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Please fill the required fields.',
      });
      return;
    }
    if (username && username.length < 8) {
      setAlert({
        ...alert,
        status: true,
        msg: 'SID must be 8 characters long',
      });
      return;
    }
    if (email && !pattern.test(email)) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Invalid Email. Please try again!',
      });
      return;
    }
    if (password && password.length < 8) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Password length should be min 8 characters',
      });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Password does not match',
      });
      return;
    }
    const res = await signup({
      first_name,
      last_name,
      email,
      password,
      username,
    });
    setSignUp({
      ...signUp,
      status: res === 200 ? true : false,
    });
  };

  useEffect(() => {
    document.title = 'Quizeal | Sign Up';
  }, []);

  if (auth.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const buttons = [
    {
      name: 'Login',
      onClick: () => history.push('/login'),
    },
  ];
  return (
    <Fragment>
      {!signUp.status ? (
        <Fragment>
          <Grow in={true} timeout={500}>
            <Container component='main' maxWidth='xs'>
              <CssBaseline />
              <div className={classes.paper}>
                <img src={logo} alt='logo' height='40' width='40' />

                <Typography component='h1' variant='h5'>
                  Sign up
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        onChange={onChange}
                        variant='outlined'
                        required
                        fullWidth
                        id='username'
                        label='SID'
                        name='username'
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        onChange={onChange}
                        autoComplete='fname'
                        name='first_name'
                        variant='outlined'
                        required
                        fullWidth
                        label='First Name'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        onChange={onChange}
                        variant='outlined'
                        fullWidth
                        id='last_name'
                        label='Last Name'
                        name='last_name'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        onChange={onChange}
                        variant='outlined'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        onChange={onChange}
                        variant='outlined'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        onChange={onChange}
                        variant='outlined'
                        required
                        fullWidth
                        name='confirmPassword'
                        label='Confirm Password'
                        type='password'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value='allowExtraEmails' color='primary' />
                        }
                        label='I want to receive inspiration, marketing promotions and updates via email.'
                      />
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    onClick={onSubmit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent='flex-end'>
                    <Grid item>
                      Already have an account?{' '}
                      <Link
                        to='/login'
                        className={'styleLink'}
                        style={{ fontWeight: 700 }}
                      >
                        Login
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Divider variant='middle' className={classes.divider} />
              <Box mt={5}>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  align='center'
                >
                  {'Copyright © '}
                  <Link
                    to='/'
                    className={'styleLink'}
                    style={{ fontWeight: 700 }}
                  >
                    Quizeal
                  </Link>{' '}
                  {new Date().getFullYear()}
                  {'.'}
                </Typography>
              </Box>
            </Container>
          </Grow>
        </Fragment>
      ) : (
        <InfoCard
          buttons={buttons}
          msg='Signup Successfully'
          detail='Your account is created succesfully, Please Login to Continue.'
          gif='success.gif'
        />
      )}
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signup })(Signup);
