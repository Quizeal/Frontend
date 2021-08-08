import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import QAList from '../quiz/QAList';
import { Typography } from '@material-ui/core';
import { getQuizReport } from '../../apiHandlers.js/quiz';
import { useState } from 'react';
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
import Loading from '../layout/Loading';
import { Fragment } from 'react';

const dataX = [
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

export default function QuizReport(props) {
  const { quiz_id } = props.match.params;
  const [server, setServer] = useState({ data: '', loading: true });

  const getQuizReportHandler = async () => {
    const res = await getQuizReport(quiz_id);
    if (res.msg) setServer({ ...server, msg: res.msg, loading: false });
    else setServer({ ...server, data: res, loading: false });
  };

  const { data, loading, msg } = server;

  const classes = useStyles();
  useEffect(() => {
    document.title = 'Quizeal | Quiz Report';
    getQuizReportHandler();
  }, []);

  //   DUMMY DATA
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {data ? (
            <Fragment>
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
                          {data.user_marks}/{data.quiz_marks}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper className={classes.paper}>
                        <Typography variant='subtitle1' align='center'>
                          Rank
                        </Typography>
                        <Typography variant='h4' align='center'>
                          {data.user_rank}/{data.total_students}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper className={classes.paper}>
                        <Typography variant='subtitle1' align='center'>
                          Average
                        </Typography>
                        <Typography variant='h4' align='center'>
                          {'NOT FOUND'}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper className={classes.paper}>
                        <Typography variant='subtitle1' align='center'>
                          Percentile
                        </Typography>
                        <Typography variant='h4' align='center'>
                          {'NOT FOUND'}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Divider className={classes.divider} />
                  <Grid item>
                    <Paper>
                      <Chart data={dataX}>
                        <ArgumentAxis />
                        <ValueAxis max={7} />

                        <BarSeries
                          valueField='population'
                          argumentField='year'
                        />
                        <Title text='Quiz Analysis(Dummy Data)' />
                        <Animation />
                        <EventTracker />
                        <Tooltip />
                      </Chart>
                    </Paper>
                  </Grid>
                </Grid>
                <Divider
                  orientation='vertical'
                  flexItem
                  className={classes.divider}
                />
                <Grid item sm={12} md={6} className={classes.sectionRight}>
                  <Typography
                    variant='h4'
                    align='center'
                    style={{ paddingBottom: '10px' }}
                  >
                    Question and Answers
                  </Typography>
                  {data.questions.map((qa, index) => {
                    return <QAList report={true} key={index} qaSet={qa} />;
                  })}
                </Grid>
              </Grid>
            </Fragment>
          ) : (
            msg
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
