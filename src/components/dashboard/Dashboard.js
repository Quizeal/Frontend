import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Grid,
  TextField,
  IconButton,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grow,
  makeStyles,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import MySnackbar from '../layout/MySnackbar';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    gap: '20px',
    alignItems: 'center',
    margin: '20px',
  },
  cardBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 180,
  },
});

const Dashboard = ({ auth: { user } }) => {
  const classes = useStyles();
  const history = useHistory();
  const [quizCode, setQuizCode] = useState('');
  const [alert, setAlert] = React.useState({ status: false, msg: '' });

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

  const onChange = (e) => {
    setQuizCode(e.target.value);
  };

  const goToQuiz = () => {
    if (quizCode.length < 5) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Invalid code or you might be not signed in with correct account',
      });
      return;
    }
    history.push(`/quiz/${user && user.username}/${quizCode}`);
  };
  useEffect(() => {
    document.title = 'Quizeal | Dashboard';
  }, []);
  return (
    <Fragment>
      <Grid container justifyContent='center'>
        <Grid container justifyContent='center' className={classes.root}>
          <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
            <Grid item xs={12} sm={6} md={3} className={classes.cardBox}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image='/static/images/myQuizzes1.jpg'
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      My Quizzes
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      Collections of all quizzes taken or created by you till
                      present date in an organized way.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link
                    to={`/my-quizzes/${user && user.username}`}
                    className={'styleLink'}
                  >
                    <Button size='small' color='primary' variant='contained'>
                      See my quizzes
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grow>
          <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1500}>
            <Grid item xs={12} sm={6} md={3} className={classes.cardBox}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image='/static/images/createQuiz.jpg'
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Create Quiz
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      Create Quiz with more flexibility with forms which
                      includes selecting multiple options and answers and
                      editing of questions.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link to='/create-quiz' className={'styleLink'}>
                    <Button size='small' color='primary' variant='contained'>
                      Create now
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grow>
          <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={2000}>
            <Grid item xs={12} sm={6} md={3} className={classes.cardBox}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image='/static/images/quiz.jpg'
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Take a Quiz
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      Take a quiz with the simple and easily adabtable system.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <TextField
                    variant='outlined'
                    size='small'
                    label='Enter Quiz Code'
                    onChange={onChange}
                  />
                  <IconButton
                    color='primary'
                    aria-label='add to shopping cart'
                    disabled={!Boolean(quizCode)}
                    onClick={goToQuiz}
                  >
                    <SendIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grow>
        </Grid>
        <Grid container justifyContent='center' className={classes.root}>
          <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={2500}>
            <Grid item xs={12} sm={6} md={3} className={classes.cardBox}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image='/static/images/profile.jpg'
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Profile
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      Update and Edit your profile and add avatar to get your
                      profile more attractive.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link to='/me' className={'styleLink'}>
                    <Button size='small' color='primary' variant='contained'>
                      Go to Profile
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grow>
          <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={3000}>
            <Grid item xs={12} sm={6} md={3} className={classes.cardBox}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image='/static/images/setting.jpg'
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Settings
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      Please change password after every 90 days.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link to='/setting' className={'styleLink'}>
                    <Button size='small' color='primary' variant='contained'>
                      Setting
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grow>
        </Grid>
      </Grid>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
