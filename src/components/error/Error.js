import React, { useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import errorGif from '../../resources/error.gif';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(10),
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6),
    },
  },
}));

const Error = () => {
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    document.title = 'Quizeal | Error 404';
  }, []);

  return (
    <Grid
      container
      spacing={5}
      justifyContent='center'
      className={classes.section}
    >
      <Grid item xs={12} md={6}>
        <Grid
          container
          justifyContent='flex-start'
          spacing={2}
          style={{ gridGap: '20px' }}
        >
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
      </Grid>
      <Grid item xs={12} md={6} className={classes.sectionRight}>
        <Typography
          variant='h4'
          align='center'
          style={{ paddingBottom: '10px' }}
        >
          <img src={errorGif} alt='error' width='95%'></img>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Error;
