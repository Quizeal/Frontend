import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../resources/logo.png';
import DashboardNavbar from '../dashboard/DashboardNavbar';
import { Hidden, Button, ListItemIcon, ListItemText } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import FeedbackIcon from '@material-ui/icons/Feedback';

// Custom Style for Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    padding: '30px 50px',
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const [navbarState, updateNavbarState] = useState(false);
  const toggleNavbarState = () => {
    console.log('hi');
    const presentState = navbarState;
    updateNavbarState(!presentState);
  };

  const autherized = false;
  // Need to set up after signIn/singUp login completion
  // [

  // const authDrawerList = [
  //   'Profile',
  //   'Dashboard',
  //   'My Quizzes',
  //   'Create Quiz',
  //   'Logout',
  // ];
  // const unAuthDrawerList = ['SignIn', 'SignUp'];
  // const drawerList = autherized ? authDrawerList : unAuthDrawerList;
  // ]

  const list = () => (
    <Fragment>
      {autherized ? (
        <DashboardNavbar hideDrawer={toggleNavbarState} />
      ) : (
        <List component='nav' aria-label='main mailbox folders'>
          <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary='Sign Up' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary='Log In' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary='About' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary='Feedback' />
          </ListItem>
        </List>
      )}
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' className={classes.title}>
            <Link
              to='/'
              className={'styleLink'}
              style={{
                color: 'white',
                textTransform: 'uppercase',
              }}
            >
              <img
                width='35px'
                src={logo}
                alt='Logo'
                style={{ paddingRight: '2px' }}
              />
              uizeaL
            </Link>
          </Typography>

          <Hidden smDown>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button color='inherit'>FeedBack</Button>
              <Button color='inherit'>About</Button>
              <Button color='inherit'>Log In</Button>
              <Button color='inherit' variant='outlined' size='small'>
                Sign Up
              </Button>
            </div>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={() => toggleNavbarState()}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Drawer
            anchor='left'
            open={navbarState}
            onClose={() => toggleNavbarState()}
            className={classes.drawer}
          >
            {list()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
}
