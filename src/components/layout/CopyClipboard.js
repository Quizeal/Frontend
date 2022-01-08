import { Grid, IconButton, TextField } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React, { useState } from 'react';
import MySnackbar from './MySnackbar';

const CopyClipboard = (props) => {
  const [alert, setAlert] = useState({ status: false, msg: '' });

  const onCopy = (e) => {
    navigator.clipboard.writeText(props.copyText);
    setAlert({ ...alert, status: true, msg: 'Quiz Token Copied' });
  };

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <TextField
        variant="outlined"
        size="small"
        value={props.copyText}
        disabled
      />
      <IconButton
        color="primary"
        aria-label="add to shopping cart"
        onClick={onCopy}
      >
        <FileCopyIcon />
      </IconButton>
      <MySnackbar alert={alert} close={handleClose} />
    </Grid>
  );
};

export default CopyClipboard;
