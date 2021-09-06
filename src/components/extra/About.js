import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider, Grow, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(3),
  },
}));

const About = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = 'Quizeal | About';
  }, []);
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
