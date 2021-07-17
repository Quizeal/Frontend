import React, { useEffect } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GoogleAccount from '../layout/GoogleAccount';
import logo from '../../resources/logo.png';
import { useState } from 'react';
import MySnackbar from '../layout/MySnackbar';
import { Fragment } from 'react';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [form, setForm] = useState({
    email: null,
    password: null,
  });
  const [alert, setAlert] = useState({ status: false, msg: '' });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = 'Quizeal | Sign In';
  }, []);

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

  const onSubmit = () => {
    // Validations
    const { email, password } = form;
    var pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    if (!email || !password) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Email and Password is required.',
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
        msg: 'Invalid Credentials',
      });
      return;
    }
    console.log('LOGIN SUCCESSFULLY');
  };

  return (
    <Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={`${classes.paper} ${classes.section1}`}>
          <img src={logo} alt='logo' height='40' width='40' />
          <Typography component='h1' variant='h5'>
            Log in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Email Address'
              name='email'
              autoFocus
              onChange={onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              onChange={onChange}
            />
            {/* This will be implemented later {Remember me} */}
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              // type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={onSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='#' className={'styleLink'}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?
                <Link to='/signup' className={'styleLink'}>
                  {' '}
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Divider variant='middle' className={classes.divider} />
        <GoogleAccount />
        <Box mt={8}>
          <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link to='/' className={'styleLink'}>
              Quizeal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
}
