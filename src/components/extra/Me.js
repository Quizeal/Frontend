import React, { Fragment, useEffect, useState } from 'react';
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  CardActions,
  Grow,
  Grid,
  CardActionArea,
  CardMedia,
  makeStyles,
} from '@material-ui/core';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProfile } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 300,
    width: 300,
  },
  root: {
    gap: '20px',
    alignItems: 'center',
    margin: '20px',
  },
  cardBox: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
const Me = ({ auth: { user }, updateProfile }) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    first_name: user && user.first_name,
    last_name: user && user.last_name,
    username: user && user.username,
    university: user && user.university,
    course: user && user.course,
    email: user && user.email,
    state: user && user.state,
    country: user && user.country,
  });
  useEffect(() => {
    document.title = 'Quizeal | Me';
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const update = () => {
    updateProfile(form);
  };

  return (
    <Fragment>
      <Grow in={true} timeout={1000}>
        <Grid container justifyContent="center">
          <Grid container justifyContent="center" className={classes.root}>
            <Grid item sm={12} md={5} className={classes.cardBox}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/images/avatar.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      align="center"
                    >
                      {(user && user.username) || 'Name'}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="center"
                    >
                      Student
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={5} className={classes.cardBox}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5">Edit Profile</Typography>
                </CardContent>
                <Divider />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        onChange={onChange}
                        autoComplete="fname"
                        name="first_name"
                        value={form.first_name}
                        variant="outlined"
                        required
                        fullWidth
                        label="First Name"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        value={form.last_name}
                        disabled
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <TextField
                        onChange={onChange}
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="SID"
                        name="username"
                        value={form.username}
                        disabled
                      />
                    </Grid>
                    <Grid item sm={8} xs={12}>
                      <TextField
                        onChange={onChange}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={form.email}
                        disabled
                      />
                    </Grid>
                    <Grid item sm={8} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="University/School"
                        variant="outlined"
                        fullWidth
                        name="university"
                        value={form.university}
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Course"
                        variant="outlined"
                        fullWidth
                        name="course"
                        value={form.course}
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="State"
                        variant="outlined"
                        fullWidth
                        name="state"
                        value={form.state}
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Country"
                        variant="outlined"
                        fullWidth
                        name="country"
                        value={form.country}
                        onChange={onChange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button color="primary" variant="contained" onClick={update}>
                    Update
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grow>
    </Fragment>
  );
};

Me.propTypes = {
  auth: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateProfile })(Me);
