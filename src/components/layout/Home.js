import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../resources/logo.png';
import home from '../../resources/home.gif';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: '70px',
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: null,
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container spacing={5} className={classes.section}>
      <Grid item xs={12} md={6} justify='center'>
        <Grid
          container
          justifyContent='start'
          spacing={2}
          style={{ gridGap: '20px' }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}
          >
            <img src={logo} alt='logo' width='30%' />
            <Typography variant='h1' style={{ textTransform: 'uppercase' }}>
              uizeal
            </Typography>
          </div>
          <Typography variant='h4'>
            The ultimate Quiz taking platform for the present times.
          </Typography>
          <Link to='/signin'>
            <Button variant='contained' color='primary'>
              Get Started
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        className={classes.sectionRight}
        justify='center'
      >
        <Typography
          variant='h4'
          align='center'
          style={{ 'padding-bottom': '10px' }}
        >
          <img src={home} alt='home' width='95%'></img>
        </Typography>
      </Grid>
    </Grid>
  );
}
