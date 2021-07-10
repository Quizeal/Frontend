import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { useLocation } from 'react-router';
import errorGif from '../../resources/error.gif';

const Error = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Quizeal | Error 404';
  }, []);

  return (
    <Container>
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
          <img src={errorGif} alt='Error Gif' height='100%' width='100%' />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Error;
