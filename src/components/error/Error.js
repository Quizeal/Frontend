import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import errorGif from '../../resources/error.gif';
import { useLocation } from 'react-router';

export default function Error() {
  const location = useLocation();
  return (
    <Grid container justifyContent='center' style={{ margin: '30px' }}>
      <Grid item>
        <Typography variant='h1'>Oops!</Typography>
        <Typography variant='h4'>
          We can't seem to find the page "{location.pathname}" you're looking
          for.
        </Typography>
        <Typography variant='h6' style={{ fontWeight: 'bold' }}>
          Error Code: 404
        </Typography>
      </Grid>
      <Grid item>
        <img src={errorGif} height='100%' width='100%' />
      </Grid>
    </Grid>
  );
}
