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
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
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
      label: 'Setting',
      path: '/setting',
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
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
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
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {isAuthenticated
            ? AuthenticatedList.map((list) => (
                <Link to={list.path} className={'styleLink'}>
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
                <Link to={list.path} className={'styleLink'}>
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
            <Link to={list.path} className={'styleLink'}>
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
