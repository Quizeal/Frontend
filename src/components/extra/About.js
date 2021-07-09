import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider, Grid, Grow, Typography } from '@material-ui/core';
import React from 'react';
import { Fragment, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(3),
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grow in={true} timeout={1000}>
        <Container component='main' maxWidth='md' spacing={5}>
          <Typography variant='h4' align='center'>
            About
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant='paragraph'>
            The ultimate Quiz taking platform for the present times.
          </Typography>
        </Container>
      </Grow>
    </Fragment>
  );
};

export default About;

// TODO
// --> ADD MORE DETAILED ABOUT PAGE
