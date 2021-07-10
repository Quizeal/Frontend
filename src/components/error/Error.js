import React, { useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
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
          <Link to='/'>
            <Button color='primary' variant='contained'>
              Home
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <img src={errorGif} alt='Error Gif' height='90%' width='80%' />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Error;
