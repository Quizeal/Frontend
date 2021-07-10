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

// Custom Style for Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    padding: '10px 20px',
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const [navbarState, updateNavbarState] = useState(false);
  const toggleNavbarState = () => {
    const presentState = navbarState;
    updateNavbarState(!presentState);
  };

  // Need to set up after signIn/singUp login completion
  // [
  const autherized = true;

  const authDrawerList = ['Profile', 'Dashboard', 'My Quizzes', 'Logout'];
  const unAuthDrawerList = ['SignIn', 'SignUp'];
  const drawerList = autherized ? authDrawerList : unAuthDrawerList;
  // ]

  const list = () => (
    <Fragment>
      <List>
        {drawerList.map((text, index) => {
          return (
            <Link
              key={index}
              to={`/${text.toLowerCase().split(' ').join('-')}`}
              onClick={toggleNavbarState}
              className={'styleLink'}
            >
              <ListItem button key={text} className={classes.drawer}>
                {text}
              </ListItem>
            </Link>
          );
        })}
      </List>
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
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={() => toggleNavbarState()}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor='right'
            open={navbarState}
            onClose={() => toggleNavbarState()}
          >
            {list()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
}
