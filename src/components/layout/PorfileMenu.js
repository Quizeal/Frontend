import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';

// REDUX
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileMenu = ({ auth: { isAuthenticated, user }, logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      {isAuthenticated ? (
        <Fragment>
          <Button
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <Avatar
              alt={user && user.username}
              src='/static/images/avatar.jpg'
            />
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to='/me' className={'styleLink'}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <Link to='/setting' className={'styleLink'}>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Link>
            <MenuItem onClick={logout}>Logout</MenuItem>
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
