import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Button, Menu, MenuItem, Avatar } from '@material-ui/core';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const ProfileMenu = ({ auth: { isAuthenticated, user }, logout }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <Fragment>
      {isAuthenticated ? (
        <Fragment>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Avatar
              alt={user && user.username}
              src="/static/images/avatar.jpg"
            />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/me" className={'styleLink'}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <Link to="/settings" className={'styleLink'}>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Link>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </Fragment>
      ) : (
        ''
      )}
    </Fragment>
  );
};

ProfileMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(ProfileMenu);

// TODO
// --> Add Profile Pic (To be done after backend)
