import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import QAList from '../quiz/QAList';
import { qaList } from '../../data';
import { Typography } from '@material-ui/core';

// React Charts
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper } from '@material-ui/core';
import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';

const data = [
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
];

const useStyles = makeStyles((theme) => ({
  section: {
    padding: '30px',
    maxWidth: '100%',
  },
  divider: {
    margin: '20px',
    [theme.breakpoints.down('sm')]: {
      visibility: 'hidden !important',
    },
  },
  paper: {
    height: 145,
    width: 145,
    [theme.breakpoints.down('sm')]: {
      height: 160,
      width: 160,
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sectionRight: {
    flex: '10',
    height: '85vh',
    overflow: 'scroll',
  },
}));

export default function QuizReport() {
  const classes = useStyles();
  useEffect(() => {
    document.title = 'Quizeal | Quiz Report';
  }, []);

  //   DUMMY DATA
  const reportData = {
    rank: 55,
    total_studentent_attenmted_quiz: 125,
    max_marks: 100,
    marks: 90,
    accuracy: 95,
    percentile: 69,
    questions: qaList,
  };

  const {
    rank,
    total_studentent_attenmted_quiz,
    marks,
    max_marks,
    accuracy,
    percentile,
    questions,
  } = reportData;

  return (
    <Grid
      container
      spacing={5}
      className={classes.section}
      justifyContent='center'
    >
      <Grid item sm={12} md={6}>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography variant='subtitle1' align='center'>
                Marks
              </Typography>
              <Typography variant='h4' align='center'>
                {marks}/{max_marks}
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography variant='subtitle1' align='center'>
                Rank
              </Typography>
              <Typography variant='h4' align='center'>
                {rank}/{total_studentent_attenmted_quiz}
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography variant='subtitle1' align='center'>
                Accuracy
              </Typography>
              <Typography variant='h4' align='center'>
                {accuracy}
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography variant='subtitle1' align='center'>
                Percentile
              </Typography>
              <Typography variant='h4' align='center'>
                {percentile}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item>
          <Paper>
            <Chart data={data}>
              <ArgumentAxis />
              <ValueAxis max={7} />

              <BarSeries valueField='population' argumentField='year' />
              <Title text='Quiz Analysis(Dummy Data)' />
              <Animation />
              <EventTracker />
              <Tooltip />
            </Chart>
          </Paper>
        </Grid>
      </Grid>
      <Divider orientation='vertical' flexItem className={classes.divider} />
      <Grid item sm={12} md={6} className={classes.sectionRight}>
        <Typography
          variant='h4'
          align='center'
          style={{ paddingBottom: '10px' }}
        >
          Question and Answers
        </Typography>
        {questions.map((qa, index) => {
          return <QAList report={true} key={index} qaSet={qa} />;
        })}
      </Grid>
    </Grid>
  );
}
