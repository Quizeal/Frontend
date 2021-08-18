import React, { Fragment, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  CardActions,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import MySnackbar from '../layout/MySnackbar';

// REDUX
import { connect } from 'react-redux';
import { changePassword, deleteAccount } from '../../actions/auth';
import PropTypes from 'prop-types';

const Setting = ({
  changePassword,
  deleteAccount,
  auth: { user },
  ...props
}) => {
  const classes = props.classes;
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState({ status: false, msg: '' });
  const [form, setForm] = useState({
    old_password: null,
    new_password: null,
    confirm_new_password: null,
  });

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

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
    handleCloseDialog();
    changePassword({
      old_password,
      new_password,
      username: user && user.username,
    });
  };

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image='/static/images/setting.jpg'
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              Settings
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Please change password after every 90 days.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary' onClick={handleClickOpenDialog}>
            Setting
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Account Setting</DialogTitle>
        <DialogContent>
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
        </DialogContent>
      </Dialog>
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
