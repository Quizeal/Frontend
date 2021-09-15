import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Typography,
  CssBaseline,
  AppBar,
  Zoom,
  Grid,
  Tooltip,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InfoIcon from '@material-ui/icons/Info';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import FeedbackIcon from '@material-ui/icons/Feedback';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import logo from '../../resources/logo.png';
import ProfileMenu from './PorfileMenu';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const commontList = [
  {
    component: <CodeIcon />,
    label: 'Developers',
    path: '/developers',
  },
  {
    component: <FeedbackIcon />,
    label: 'Feedback',
    path: '/feedback',
  },
  {
    component: <InfoIcon />,
    label: 'About',
    path: '/about',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    minHeight: '85vh',
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const MiniDrawer = ({ auth: { isAuthenticated, user }, ...props }) => {
  const AuthenticatedList = [
    {
      component: <DashboardIcon />,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      component: <FormatListBulletedIcon />,
      label: 'My Quizzes',
      path: `/my-quizzes/${user && user.username}`,
    },
    {
      component: <CreateIcon />,
      label: 'Create Quiz',
      path: '/create-quiz',
    },
    {
      component: <PersonIcon />,
      label: 'Profile',
      path: '/me',
    },
    {
      component: <SettingsIcon />,
      label: 'Settings',
      path: '/settings',
    },
  ];

  const UnAuthenticatedList = [
    {
      component: <AccountBoxIcon />,
      label: 'Sign Up',
      path: 'signup',
    },
    {
      component: <LockIcon />,
      label: 'Login',
      path: 'login',
    },
  ];
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' noWrap>
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
            <ProfileMenu />
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {isAuthenticated
            ? AuthenticatedList.map((list) => (
                <Link
                  to={list.path}
                  className={'styleLink'}
                  onClick={handleDrawerClose}
                >
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={list.label}
                    placement='right'
                    disableHoverListener={open}
                  >
                    <ListItem button key={list.label}>
                      <ListItemIcon>{list.component}</ListItemIcon>
                      <ListItemText primary={list.label} />
                    </ListItem>
                  </Tooltip>
                </Link>
              ))
            : UnAuthenticatedList.map((list) => (
                <Link
                  to={list.path}
                  className={'styleLink'}
                  onClick={handleDrawerClose}
                >
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={list.label}
                    placement='right'
                    disableHoverListener={open}
                  >
                    <ListItem button key={list.label}>
                      <ListItemIcon>{list.component}</ListItemIcon>
                      <ListItemText primary={list.label} />
                    </ListItem>
                  </Tooltip>
                </Link>
              ))}
        </List>
        <Divider />
        <List>
          {commontList.map((list) => (
            <Link
              to={list.path}
              className={'styleLink'}
              onClick={handleDrawerClose}
            >
              <Tooltip
                TransitionComponent={Zoom}
                title={list.label}
                placement='right'
                disableHoverListener={open}
              >
                <ListItem button key={list.label}>
                  <ListItemIcon>{list.component}</ListItemIcon>
                  <ListItemText primary={list.label} />
                </ListItem>
              </Tooltip>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};

MiniDrawer.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(MiniDrawer);
