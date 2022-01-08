import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Divider,
  Grow,
  makeStyles,
} from '@material-ui/core';
import MySnackbar from '../layout/MySnackbar';
import logo from '../../resources/logo.png';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

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
  section: {
    padding: theme.spacing(6),
    maxWidth: '100%',
    rowGap: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4),
      rowGap: theme.spacing(5),
    },
  },
}));

const Login = ({ login, auth, ...props }) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    email: null,
    password: null,
    username: null,
  });
  const [alert, setAlert] = useState({ status: false, msg: '' });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = 'Quizeal | Login';
  }, []);

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

  const onSubmit = async () => {
    // Validations
    const { password, username } = form;
    const patternEmail = new RegExp(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    );
    const patternCheckEmail = new RegExp(/@/);
    if (!username || !password) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Please fill the required fields.',
      });
      return;
    }
    if (
      username &&
      patternCheckEmail.test(username) &&
      !patternEmail.test(username)
    ) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Invalid Email. Please try again!',
      });
      return;
    }
    if (
      (password && password.length < 8) ||
      (username && username.length < 8)
    ) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Invalid Credentials',
      });
      return;
    }

    login(username, password);
  };
  const { isAuthenticated } = auth;

  const redirectUrl = props.location.state
    ? props.location.state.from.pathname
    : '/dashboard';
  if (isAuthenticated) {
    return <Redirect to={redirectUrl} />;
  }

  return (
    <Fragment>
      <Grow in={true} timeout={500}>
        <Grid
          container
          component="main"
          maxWidth="xs"
          className={classes.section}
          justifyContent="space-around"
          alignItems="center"
        >
          <CssBaseline />
          <Grid item xs={12} md={4}>
            <div className={`${classes.paper} ${classes.section1}`}>
              <img src={logo} alt="logo" height="40" width="40" />
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <form className={classes.form} noValidate>
                <Grid item xs={12}>
                  <TextField
                    onChange={onChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="SID or Email"
                    autoFocus
                    name="username"
                  />
                </Grid>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={onChange}
                />
                {/* This will be implemented later {Remember me} */}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  // type='submit'
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSubmit}
                >
                  LogIn
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      to="#"
                      className={'styleLink'}
                      style={{ fontWeight: 700 }}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    Don't have an account?
                    <Link
                      to="/signup"
                      className={'styleLink'}
                      style={{ fontWeight: 700 }}
                    >
                      {' '}
                      Sign up
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Divider variant="middle" className={classes.divider} />
            <Box mt={8}>
              <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link
                  to="/"
                  className={'styleLink'}
                  style={{ fontWeight: 700 }}
                >
                  Quizeal
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} justifyContent="center" container>
            <img
              src="/static/images/illustrations/login.png"
              alt="login"
              width="85%"
            ></img>
          </Grid>
        </Grid>
      </Grow>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);

// TODO
// --> Remeber Me
// --> TOTP
// --> Integrate with Mail
