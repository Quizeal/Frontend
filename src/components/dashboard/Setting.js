import React, { Fragment } from 'react';
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

const Setting = (props) => {
  const classes = props.classes;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <Button size='small' color='primary' onClick={handleClickOpen}>
            Setting
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
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
                id='outlined-basic'
                label='Password'
                variant='outlined'
                fullWidth
                style={{ marginBottom: '10px' }}
              />
              <TextField
                id='outlined-basic'
                label='Confirm Password'
                variant='outlined'
                fullWidth
              />
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='primary'
                style={{ backgroundColor: '#f44336' }}
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
              >
                Delete Account
              </Button>
            </CardActions>
          </Card>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Setting;
