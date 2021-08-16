import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Loading = ({ loading }) => {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='default' />
      </Backdrop>
    </div>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(Loading);
