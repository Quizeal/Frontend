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
import CodeIcon from '@material-ui/icons/Code';

// REDUX
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

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
  list: {
    width: 250,
  },
}));

const NavBar = ({ logout, auth: { isAuthenticated, user } }) => {
  const classes = useStyles();

  const [navbarState, updateNavbarState] = useState(false);
  const toggleNavbarState = () => {
    const presentState = navbarState;
    updateNavbarState(!presentState);
  };

  const list = () => (
    <Fragment>
      {isAuthenticated ? (
        <div className={classes.list}>
          <DashboardNavbar hideDrawer={toggleNavbarState} />
        </div>
      ) : (
        <List
          component='nav'
          aria-label='main mailbox folders'
          className={classes.list}
          onClick={toggleNavbarState}
        >
          <Link className={'styleLink'} to='/signup'>
            <ListItem button>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary='Sign Up' />
            </ListItem>
          </Link>
          <Link className={'styleLink'} to='/login'>
            <ListItem button>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary='Log In' />
            </ListItem>
          </Link>
          <Link className={'styleLink'} to='/about'>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary='About' />
            </ListItem>
          </Link>
          <Link className={'styleLink'} to='/feedback'>
            <ListItem button>
              <ListItemIcon>
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText primary='Feedback' />
            </ListItem>
          </Link>
          <Link className={'styleLink'} to='/developers'>
            <ListItem button>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary='Developers' />
            </ListItem>
          </Link>
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
          <Fragment>
            <Hidden smDown>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button color='inherit'>
                  <Link className={'styleLink'} to='/developers'>
                    Developers
                  </Link>
                </Button>
                <Button color='inherit'>
                  <Link className={'styleLink'} to='/feedback'>
                    FeedBack
                  </Link>
                </Button>
                <Button color='inherit'>
                  <Link className={'styleLink'} to='/about'>
                    About
                  </Link>
                </Button>
                {!isAuthenticated ? (
                  <Fragment>
                    <Button color='inherit'>
                      <Link className={'styleLink'} to='/login'>
                        Log In
                      </Link>
                    </Button>
                    <Button color='inherit' variant='outlined'>
                      <Link className={'styleLink'} to='/signup'>
                        Sign Up
                      </Link>
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Button
                      color='inherit'
                      style={{ marginRight: '10px' }}
                      onClick={logout}
                    >
                      Logout
                    </Button>
                    <IconButton
                      edge='start'
                      color='inherit'
                      aria-label='menu'
                      onClick={() => toggleNavbarState()}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Fragment>
                )}
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
          </Fragment>
          {/* )} */}
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
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
