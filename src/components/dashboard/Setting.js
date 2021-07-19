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

const Setting = (props) => {
  const classes = props.classes;
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState({ status: false, msg: '' });
  const [form, setForm] = useState({
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null,
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

  const deleteAccount = () => {
    console.log('ACCOUNT DELETED');
  };

  const update = () => {
    const { oldPassword, newPassword, confirmNewPassword } = form;
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Please fill the required fields.',
      });
      return;
    }
    if (newPassword && newPassword.length < 8) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Password length should be min 8 characters',
      });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setAlert({
        ...alert,
        status: true,
        msg: 'New Password does not match',
      });
      return;
    }
    console.log('PASSWORD UPDATED');
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
                name='oldPassword'
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
                name='newPassword'
                style={{ marginBottom: '10px' }}
              />
              <TextField
                onChange={onChange}
                id='outlined-basic'
                label='Confirm New Password'
                variant='outlined'
                type='password'
                required
                name='confirmNewPassword'
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

export default Setting;
