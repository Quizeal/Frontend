import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { Avatar, Typography } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    maxHeight: '88vh',
    backgroundColor: '#f3f8ff',
  },
}));

const DashboardNavbar = ({ user, ...props }) => {
  const classes = useStyles();
  // const [selectedIndex, setSelectedIndex] = React.useState(0);

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
        <Avatar alt='Remy Sharp' src='/static/images/avatar.jpg' />
        <Typography style={{ fontWeight: 'bold' }}>
          {user.first_name + ' ' + user.last_name}
        </Typography>
        <Typography style={{ fontWeight: 'lighter' }}>Student</Typography>
      </div>
      <Divider />
      <List component='nav' aria-label='main mailbox folders'>
        <Link to='/dashboard' className={'styleLink'}>
          <ListItem button onClick={closeNav}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
        </Link>
        <Link
          to={`/my-quizzes/${user && user.username}`}
          className={'styleLink'}
        >
          <ListItem button onClick={closeNav}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary='My Quizzes' />
          </ListItem>
        </Link>
        <Link to='/create-quiz' className={'styleLink'}>
          <ListItem button onClick={closeNav}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary='Create Quiz' />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List component='nav' aria-label='secondary mailbox folder'>
        <ListItem button onClick={closeNav}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItem>
        <ListItem button onClick={closeNav}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='Setting' />
        </ListItem>
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
