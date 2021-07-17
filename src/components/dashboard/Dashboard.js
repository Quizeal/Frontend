import React, { Fragment, useState } from 'react';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Profile from './Profile';
import SendIcon from '@material-ui/icons/Send';
import Setting from './Setting';
import MySnackbar from '../layout/MySnackbar';

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

export default function Dashboard() {
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
    // fETCH DATA FROM QUIZ api
    history.push(`/quiz/${quizCode}`);
  };

  return (
    <Fragment>
      <Grid container justifyContent='center'>
        <Grid container justifyContent='center' className={classes.root}>
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
                <Link to='/my-quizzes'>
                  <Button size='small' color='primary'>
                    See your quizzes
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
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
                    Create Quiz with more flexibility with forms which includes
                    selecting multiple options and answers and editing of
                    questions.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to='/create-quiz'>
                  <Button size='small' color='primary'>
                    Create now
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
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
        </Grid>
        <Grid container justifyContent='center' className={classes.root}>
          <Grid item xs={12} sm={6} md={3} className={classes.cardBox}>
            <Profile classes={classes} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.cardBox}>
            <Setting classes={classes} />
          </Grid>
        </Grid>
      </Grid>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
}
