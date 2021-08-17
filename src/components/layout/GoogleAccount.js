import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  googleAccount: {
    background: '#fff',
    '&:hover': {
      background: '#fff',
    },
    color: 'black',
    textTransform: 'none',
  },
  googleAccountImage: {
    height: '20px',
  },
}));

export default function GoogleAccount(props) {
  const classes = useStyle();
  return (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      color='primary'
      onClick={props.click}
      className={classes.googleAccount}
      startIcon={
        <img
          alt='Google Account'
          src='https://img.icons8.com/fluent/48/000000/gmail-new.png'
          className={classes.googleAccountImage}
        />
      }
    >
      Continue with Google
    </Button>
  );
}
