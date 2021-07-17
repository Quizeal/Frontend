import React, { Fragment } from 'react';
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  CardActions,
  CardActionArea,
  CardMedia,
  DialogContent,
  Dialog,
  DialogTitle,
} from '@material-ui/core';

const Profile = (props) => {
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
            image='/static/images/profile.jpg'
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              Profile
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Update and Edit your profile and add avatar to get your profile
              more attractive.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary' onClick={handleClickOpen}>
            Go to Profile
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Profile</DialogTitle>
        <DialogContent>
          <Card style={{ margin: '20px' }}>
            <CardContent>
              <Typography variant='h5'>Profile</Typography>
            </CardContent>
            <Divider />
            <CardContent
              style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
            >
              <TextField
                id='outlined-basic'
                label='Name'
                variant='outlined'
                fullWidth
              />
              <TextField
                id='outlined-basic'
                label='Email Address'
                variant='outlined'
                fullWidth
              />
              <TextField
                id='outlined-basic'
                label='University/School'
                variant='outlined'
                fullWidth
              />
              <TextField
                id='outlined-basic'
                label='Course'
                variant='outlined'
                fullWidth
              />
              <TextField
                id='outlined-basic'
                label='State'
                variant='outlined'
                fullWidth
              />
              <TextField
                id='outlined-basic'
                label='Country'
                variant='outlined'
                fullWidth
              />
            </CardContent>
            <Divider />
            <CardActions>
              <Button variant='contained' color='primary'>
                Update
              </Button>
            </CardActions>
          </Card>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Profile;
