import React, { Fragment, useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  CardActions,
  Container,
  Grow,
} from '@material-ui/core';
import MySnackbar from '../layout/MySnackbar';

// REDUX
import { connect } from 'react-redux';
import { changePassword, deleteAccount } from '../../actions/auth';
import PropTypes from 'prop-types';
import { UnAuthorized } from '../../utils/extraFunctions';

const Setting = ({
  changePassword,
  deleteAccount,
  auth: { user, isAuthenticated },
}) => {
  const [alert, setAlert] = useState({ status: false, msg: '' });
  const [form, setForm] = useState({
    old_password: null,
    new_password: null,
    confirm_new_password: null,
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

  useEffect(() => {
    document.title = 'Quizeal | Setting';
  }, []);

  const update = () => {
    const { old_password, new_password, confirm_new_password } = form;
    if (!old_password || !new_password || !confirm_new_password) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Please fill the required fields.',
      });
      return;
    }
    if (new_password && new_password.length < 8) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Password length should be min 8 characters',
      });
      return;
    }
    if (new_password !== confirm_new_password) {
      setAlert({
        ...alert,
        status: true,
        msg: 'New Password does not match',
      });
      return;
    }
    changePassword({
      old_password,
      new_password,
      username: user && user.username,
    });
  };

  if (!isAuthenticated) {
    return UnAuthorized('/');
  }
  return (
    <Fragment>
      <Grow in={true} timeout={1000}>
        <Container component='main' maxWidth='sm'>
          <Card style={{ margin: '20px' }}>
            <CardContent>
              <Typography variant='h5' color='error'>
                Change Password
              </Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <TextField
                onChange={onChange}
                id='outlined-basic'
                label='Old Password'
                variant='outlined'
                fullWidth
                required
                type='password'
                name='old_password'
                style={{ marginBottom: '10px' }}
              />
              <TextField
                onChange={onChange}
                id='outlined-basic'
                label='New Password'
                variant='outlined'
                fullWidth
                required
                type='password'
                name='new_password'
                style={{ marginBottom: '10px' }}
              />
              <TextField
                onChange={onChange}
                id='outlined-basic'
                label='Confirm New Password'
                variant='outlined'
                type='password'
                required
                name='confirm_new_password'
                fullWidth
              />
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='primary'
                style={{ backgroundColor: '#f44336' }}
                onClick={update}
              >
                Update
              </Button>
            </CardActions>
          </Card>
          <Card style={{ margin: '20px' }}>
            <CardContent>
              <Typography variant='h5' color='error'>
                Delete Account
              </Typography>
            </CardContent>
            <Divider />
            <CardContent>
              This will permanently delete your account and erase all the data.
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='primary'
                style={{ backgroundColor: '#f44336' }}
                onClick={deleteAccount}
              >
                Delete Account
              </Button>
            </CardActions>
          </Card>
        </Container>
      </Grow>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
};

Setting.propTypes = {
  changePassword: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changePassword, deleteAccount })(
  Setting
);
