import React, { useState } from 'react';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../resources/logo.png';
import home from '../../resources/home.gif';
import { useHistory } from 'react-router';

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
  const history = useHistory();
  const classes = useStyles();
  const [quizCode, setQuizCode] = useState('');

  const onChange = (e) => {
    setQuizCode(e.target.value);
  };
  const goToQuiz = () => {
    history.push(`/quiz/${quizCode}`);
  };

  return (
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
          style={{ gridGap: '20px' }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}
          >
            <img src={logo} alt='logo' width='30%' />
            <Typography variant='h1' style={{ textTransform: 'uppercase' }}>
              uizeal
            </Typography>
          </div>
          <Typography variant='h4'>
            The ultimate Quiz taking platform for the present times.
          </Typography>
          <Link to='/signup'>
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
            <Button
              color='primary'
              variant='contained'
              disabled={!Boolean(quizCode)}
              onClick={goToQuiz}
            >
              Start
            </Button>
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
  );
}
