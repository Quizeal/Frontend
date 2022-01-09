import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Grid, Grow, Typography, makeStyles } from '@material-ui/core';
import errorGif from '../../resources/error.gif';

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
      justifyContent="center"
      className={classes.section}
    >
      <Grow in={true} timeout={500}>
        <Grid item xs={12} md={6}>
          <Grid
            container
            justifyContent="flex-start"
            spacing={2}
            style={{ gridGap: '10px', flexDirection: 'column' }}
          >
            <Typography variant="h1">Oops!</Typography>
            <Typography variant="h4">
              We can't seem to find the page "{location.pathname}" you're
              looking for.
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Error Code: 404
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ fontWeight: 'lighter', fontStyle: 'italic' }}
            >
              (This site is under construction)
            </Typography>
            <Link to="/" className={'style-link'}>
              <Button color="primary" variant="contained">
                Home
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grow>
      <Grow in={true} timeout={1000}>
        <Grid item xs={12} md={6} className={classes.sectionRight}>
          <Typography
            variant="h4"
            align="center"
            style={{ paddingBottom: '10px' }}
          >
            <img src={errorGif} alt="error" width="95%"></img>
          </Typography>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default Error;
