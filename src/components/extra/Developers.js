import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider, Grid, Grow, Typography } from '@material-ui/core';
import React from 'react';
import { Fragment, useState } from 'react';
import DevelopersCard from './DevelopersCard';

// REDUC
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { githubProfile } from '../../actions/auth';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(3),
  },
}));

const Developers = ({ githubProfile }) => {
  const classes = useStyles();
  const [dev, setDev] = useState([]);

  useEffect(() => {
    const developers = async () => {
      const x = await githubProfile();
      setDev(x);
    };
    document.title = 'Quizeal | Developers';
    developers();
  }, [githubProfile]);

  return (
    <Fragment>
      <Grow in={true} timeout={1000}>
        <Container component='main' maxWidth='md' spacing={5}>
          <Typography variant='h4' align='center'>
            Developers
          </Typography>
          {dev &&
            dev.map((d, i) => {
              return (
                <Fragment>
                  <Divider className={classes.divider} />
                  <Grid
                    container
                    style={{ gap: '20px', flexDirection: 'column' }}
                    justifyContent='center'
                  >
                    <DevelopersCard
                      email={d.email}
                      name={d.name}
                      avatar={d.avatar_url}
                      location='India'
                      college='Punjab Engineering College, PEC'
                      github={d.login}
                      linkedin='daretobedifferent18'
                      twitter={d.twitter_username}
                    />
                  </Grid>
                </Fragment>
              );
            })}
        </Container>
      </Grow>
    </Fragment>
  );
};

Developers.propTypes = {
  githubProfile: PropTypes.func.isRequired,
};

export default connect(null, { githubProfile })(Developers);

// TODO
// --> Implement Dynamically
