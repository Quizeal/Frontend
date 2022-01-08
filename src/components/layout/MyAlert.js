import React from 'react';
import { Snackbar, Grid, Slide, makeStyles } from '@material-ui/core';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    top: '80px !important',
  },
}));

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const MyAlert = ({ myAlert }) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" style={{ margin: '20px' }}>
      <Grid item xs={10} sm={8}>
        {myAlert.map((a) => (
          <Snackbar
            className={classes.root}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(myAlert)}
            TransitionComponent={SlideTransition}
            message={a.msg}
            key={SlideTransition}
          />
        ))}
      </Grid>
    </Grid>
  );
};

MyAlert.propTypes = {
  myAlert: PropTypes.array,
};

const mapStateToProps = (state) => ({
  myAlert: state.myAlert,
});

export default connect(mapStateToProps)(MyAlert);
