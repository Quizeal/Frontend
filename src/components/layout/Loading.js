import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function BackdropSpinner() {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color='default' />
      </Backdrop>
    </div>
  );
}
