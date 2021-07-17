import React, { Fragment, useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import logo from '../../resources/logo.png';
import home from '../../resources/home.gif';
import MySnackbar from './MySnackbar';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(10),
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6),
    },
  },
}));

export default function Home() {
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
      <Grid
        container
        spacing={5}
        justifyContent='center'
        className={classes.section}
      >
        <Grid item xs={12} md={6}>
          <Grid
            container
            justifyContent='flex-start'
            spacing={2}
            style={{ gridGap: '20px', flexDirection: 'column' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'end',
              }}
            >
              <img src={logo} alt='logo' width='30%' />
              <Typography variant='h1' style={{ textTransform: 'uppercase' }}>
                uizeal
              </Typography>
            </div>
            <Typography variant='h4'>
              The ultimate Quiz taking platform for the present times.
            </Typography>
            <Link to='/signup' style={{ maxWidth: 'max-content' }}>
              <Button variant='contained' color='primary'>
                Get Started
              </Button>
            </Link>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <TextField
                id='outlined-basic'
                label='Add Quiz Code'
                variant='outlined'
                value={quizCode}
                onChange={(e) => onChange(e)}
                size='small'
              />
              <IconButton
                color='primary'
                aria-label='add to shopping cart'
                disabled={!Boolean(quizCode)}
                onClick={goToQuiz}
              >
                <SendIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant='h4'
            align='center'
            style={{ paddingBottom: '10px' }}
          >
            <img src={home} alt='home' width='95%'></img>
          </Typography>
        </Grid>
      </Grid>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
}
