import React, { useEffect } from 'react';
import { Grow, makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import QAList from '../quiz/QAList';
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
import { Fragment } from 'react';

// REDUX
import { connect } from 'react-redux';
import { viewQuizReport } from '../../actions/quiz';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { UnAuthorized } from '../../utils/extraFunctions';

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

const QuizReport = ({
  auth: { isAuthenticated, user },
  view_Quiz_Report,
  viewQuizReport,
  loading,
}) => {
  const params = useParams();
  const classes = useStyles();
  useEffect(() => {
    document.title = 'Quizeal | Quiz Report';
    viewQuizReport(params.quiz_id, user.username);
  }, [viewQuizReport, params.quiz_id, user]);

  const data = view_Quiz_Report;

  const dataG = [
    { category: 'Topper', marks: data ? data.topper_marks : 0 },
    { category: 'Me', marks: data ? data.user_marks : 0 },
    { category: 'Top 10% Average', marks: 3.682 }, // DUMMY (NEED TO BE ADDED AT BACKEND)
  ];

  if (!isAuthenticated) {
    return UnAuthorized('/');
  }

  return (
    <Fragment>
      {!loading && (
        <Grid
          container
          spacing={5}
          className={classes.section}
          justifyContent='center'
        >
          <Grow in={true} direction='up'>
            <Grid item sm={12} md={6}>
              <Grid container justifyContent='center' spacing={2}>
                <Grid item>
                  <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={1000}
                  >
                    <Paper className={classes.paper}>
                      <Typography variant='subtitle1' align='center'>
                        Marks
                      </Typography>
                      <Typography variant='h4' align='center'>
                        {data && data.user_marks}/{data && data.total_marks}
                      </Typography>
                    </Paper>
                  </Grow>
                </Grid>
                <Grid item>
                  <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={2000}
                  >
                    <Paper className={classes.paper}>
                      <Typography variant='subtitle1' align='center'>
                        Rank
                      </Typography>
                      <Typography variant='h4' align='center'>
                        {data && data.user_rank}/{data && data.total_students}
                      </Typography>
                    </Paper>
                  </Grow>
                </Grid>
                <Grid item>
                  <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={3000}
                  >
                    <Paper className={classes.paper}>
                      <Typography variant='subtitle1' align='center'>
                        Average
                      </Typography>
                      <Typography variant='h4' align='center'>
                        {data && data.average}
                      </Typography>
                    </Paper>
                  </Grow>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item>
                <Paper>
                  <Chart data={dataG}>
                    <ArgumentAxis />
                    <ValueAxis max={7} />

                    <BarSeries valueField='marks' argumentField='category' />
                    <Title text='Overall Quiz Analysis' />
                    <Animation />
                    <EventTracker />
                    <Tooltip />
                  </Chart>
                </Paper>
              </Grid>
            </Grid>
          </Grow>
          <Divider
            orientation='vertical'
            flexItem
            className={classes.divider}
          />
          <Grow in={true} direction='up' timeout={1500}>
            <Grid item sm={12} md={6} className={classes.sectionRight}>
              <Typography
                variant='h4'
                align='center'
                style={{ paddingBottom: '10px' }}
              >
                Question and Answers
              </Typography>
              {data &&
                data.questions.map((qa, index) => {
                  return (
                    <QAList report={true} key={index} i={index} qaSet={qa} />
                  );
                })}
            </Grid>
          </Grow>
        </Grid>
      )}
    </Fragment>
  );
};

QuizReport.propTypes = {
  auth: PropTypes.object.isRequired,
  view_Quiz_Report: PropTypes.object.isRequired,
  viewQuizReport: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  view_Quiz_Report: state.quiz.view_Quiz_Report,
  loading: state.loading,
});

export default connect(mapStateToProps, { viewQuizReport })(QuizReport);

// TODO
// --> Verify usernames authentication
// --> Add Username to dynamically url only instead of sending it as a body amd make it a get request
// --> On Reload Username is null
