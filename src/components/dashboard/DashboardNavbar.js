import React from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  makeStyles,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    maxHeight: '88vh',
    backgroundColor: '#24313f',
  },
}));

const DashboardNavbar = ({ user, ...props }) => {
  const classes = useStyles();

  const closeNav = () => {
    if (props.hideDrawer) props.hideDrawer();
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 0',
        }}
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar.jpg" />
        <Typography style={{ fontWeight: 'bold' }}>
          {/* {user.first_name + ' ' + user.last_name} */}Divyam Tayal
        </Typography>
        <Typography style={{ fontWeight: 'lighter' }}>Student</Typography>
      </div>
      <Divider style={{ backgroundColor: '#ffffff5c' }} />
      <List component="nav" aria-label="main mailbox folders">
        <Link to="/dashboard" className={'style-link'}>
          <ListItem button onClick={closeNav}>
            <ListItemIcon style={{ color: 'white' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link
          to={`/my-quizzes/${user && user.username}`}
          className={'style-link'}
        >
          <ListItem button onClick={closeNav}>
            <ListItemIcon style={{ color: 'white' }}>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="My Quizzes" />
          </ListItem>
        </Link>
        <Link to="/create-quiz" className={'style-link'}>
          <ListItem button onClick={closeNav}>
            <ListItemIcon style={{ color: 'white' }}>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Create Quiz" />
          </ListItem>
        </Link>
      </List>
      <Divider style={{ backgroundColor: '#ffffff5c' }} />
      <List component="nav" aria-label="secondary mailbox folder">
        <Link to="/me" className={'style-link'}>
          <ListItem button onClick={closeNav}>
            <ListItemIcon style={{ color: 'white' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
        <Link to="/setting" className={'style-link'}>
          <ListItem button onClick={closeNav}>
            <ListItemIcon style={{ color: 'white' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
};
DashboardNavbar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(DashboardNavbar);
