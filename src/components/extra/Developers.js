import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider, Grid, Grow, Typography } from '@material-ui/core';
import React from 'react';
import { Fragment } from 'react';
import DevelopersCard from './DevelopersCard';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(3),
  },
}));

const Developers = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grow in={true} timeout={1000}>
        <Container component='main' maxWidth='md' spacing={5}>
          <Typography variant='h4' align='center'>
            Developers
          </Typography>
          <Divider className={classes.divider} />
          <Grid
            container
            style={{ gap: '20px', flexDirection: 'column' }}
            justifyContent='center'
          >
            <DevelopersCard
              email='daretobedifferent10920@gmail.com'
              name='Divyam Tayal'
              location='India'
              college='Punjab Engineering College, PEC'
              github='daretobedifferent18'
              linkedin='daretobedifferent18'
              twitter='divyamtayal18'
            />
          </Grid>
        </Container>
      </Grow>
    </Fragment>
  );
};

export default Developers;

// TODO
// --> Implement Dynamically
