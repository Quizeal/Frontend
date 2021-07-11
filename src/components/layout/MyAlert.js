import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Grid } from '@material-ui/core';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MyAlert = ({ myAlert }) => {
  return (
    <Grid container justifyContent='center' style={{ margin: '20px' }}>
      <Grid item xs={10} sm={8}>
        {myAlert.map((a) => (
          <Alert key={a.id} severity={a.alertType}>
            {a.msg}
          </Alert>
        ))}
      </Grid>
    </Grid>
  );
};

Alert.propTypes = {
  myAlert: PropTypes.array,
};

const mapStateToProps = (state) => ({
  myAlert: state.myAlert,
});

export default connect(mapStateToProps)(MyAlert);
