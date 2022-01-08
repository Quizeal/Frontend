import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Grow, Typography } from '@material-ui/core';
import DevelopersCard from './DevelopersCard';

// REDUC
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { githubProfile } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(3),
  },
  section: {
    padding: theme.spacing(2),
    maxWidth: '100%',
    rowGap: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4),
      rowGap: theme.spacing(5),
    },
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
      {dev && (
        <Grow in={true} timeout={1000}>
          <Grid
            container
            component="main"
            maxWidth="md"
            className={classes.section}
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                Developers
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} justifyContent="center" container>
              <img
                src="/static/images/illustrations/developers.png"
                alt="developers"
                width="85%"
              ></img>
            </Grid>
            <Grid item xs={12} md={6}>
              {dev &&
                dev.map((d, i) => {
                  return (
                    <Fragment key={`${dev}_i`}>
                      <Grid
                        container
                        style={{ gap: '20px', flexDirection: 'column' }}
                        justifyContent="center"
                      >
                        <DevelopersCard
                          key={i}
                          email={d.email}
                          name={d.name}
                          avatar={d.avatar_url}
                          location="India"
                          college="Punjab Engineering College, PEC"
                          github={d.login}
                          linkedin="daretobedifferent18"
                          twitter={d.twitter_username}
                        />
                      </Grid>
                      {i !== dev.length - 1 && (
                        <Divider className={classes.divider} />
                      )}
                    </Fragment>
                  );
                })}
            </Grid>
          </Grid>
        </Grow>
      )}
    </Fragment>
  );
};

Developers.propTypes = {
  githubProfile: PropTypes.func.isRequired,
};

export default connect(null, { githubProfile })(Developers);

// TODO
// --> Implement Dynamically
