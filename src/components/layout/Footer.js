import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Grid, Typography, makeStyles, Box } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import logo from '../../resources/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#071e4f',
    color: 'white',
    padding: '30px',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1} style={{ gap: '30px' }}>
        <Grid container item xs={12} justifyContent='space-between'>
          <Grid item xs={4}>
            <img src={logo} alt='logo' height='50px' />
            <Typography variant='h4'>Start using Quizeal today.</Typography>
            <Typography variant='h5'>You Know, you Grow</Typography>
          </Grid>
          <Grid item xs={2}>
            <div>
              <Link to='/about' className='styleLink'>
                About
              </Link>
            </div>
            <div>
              <Link to='/team' className='styleLink'>
                Team
              </Link>
            </div>
            <div>
              <Link to='/' className='styleLink'>
                Home
              </Link>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div>Terms and Conditions</div>
            <div>Privacy Policy</div>
            <div></div>
          </Grid>
          <Grid item xs={2}>
            <div>Contact Us</div>
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
            <GitHubIcon />
            <div>info@example.com</div>
            <div>+91 45781-48781</div>
          </Grid>
        </Grid>
      </Grid>
      <Divider style={{ backgroundColor: 'white', margin: '10px' }} />
      <Box>
        <Typography variant='body2' align='center'>
          {'Copyright © '}
          <Link to='/' className={'styleLink'}>
            Quizeal
          </Link>{' '}
          {new Date().getFullYear()}
          {'. All rights reserved.'}
        </Typography>
      </Box>
    </div>
  );
};

export default Footer;
