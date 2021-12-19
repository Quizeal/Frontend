import React, { useEffect, Fragment } from "react";
import { useParams } from "react-router";
import {
  Grow,
  makeStyles,
  Grid,
  Divider,
  Typography,
  Paper,
} from "@material-ui/core";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { EventTracker } from "@devexpress/dx-react-chart";
import QAList from "../quiz/QAList";
import OptionsStatus from "./OptionsStatus";

// REDUX
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { viewQuizReport } from "../../actions/quiz";

const useStyles = makeStyles((theme) => ({
  section: {
    padding: "30px",
    maxWidth: "100%",
  },
  divider: {
    margin: "20px",
    [theme.breakpoints.down("sm")]: {
      visibility: "hidden !important",
    },
  },
  paper: {
    height: 145,
    width: 145,
    [theme.breakpoints.down("sm")]: {
      height: 160,
      width: 160,
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  sectionRight: {
    flex: "10",
    height: "85vh",
    overflow: "scroll",
  },
}));

const QuizReport = ({
  auth: { user },
  view_Quiz_Report,
  viewQuizReport,
  loading,
}) => {
  const params = useParams();
  const classes = useStyles();
  useEffect(() => {
    document.title = "Quizeal | Quiz Report";
    viewQuizReport(params.quiz_id, user.username);
  }, [viewQuizReport, params.quiz_id, user]);

  const data = view_Quiz_Report;

  const dataG = [
    { category: "Topper", marks: data ? data.topper_marks : 0 },
    { category: "Me", marks: data ? data.user_marks : 0 },
    { category: "Top 10% Average", marks: data ? data.top_10_percentile : 0 },
  ];
  return (
    <Fragment>
      {!loading && data && (
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
                    style={{ transformOrigin: "0 0 0" }}
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
                    style={{ transformOrigin: "0 0 0" }}
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
                    style={{ transformOrigin: "0 0 0" }}
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
                style={{ paddingBottom: "20px" }}
              >
                Question and Answers
              </Typography>
              <OptionsStatus report={true} />
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
