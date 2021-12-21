import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { Button, ButtonGroup, Typography, Grid, Grow } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import LinkIcon from "@material-ui/icons/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import AssessmentIcon from "@material-ui/icons/Assessment";

// REDUX
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { myQuizzes, deleteQuiz } from "../../actions/quiz";
import InfoCard from "../layout/InfoCard";

// Model for byDefault Sorting Table
const sortModel = [
  {
    field: "date",
    sort: "desc",
  },
];

const MyQuizzes = ({ myQuizzes, deleteQuiz, quizzes, loading, user }) => {
  // Columns of Table
  const columnsP = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   flex: 1,

    //   headerAlign: "center",
    //   align: "center",
    // },

    {
      field: "date",
      type: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quiz_name",
      headerName: "Quiz Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "Quiz taken by",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "marks",
      headerName: "Marks",
      type: "number",
      flex: 0.75,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => `${params.row.marks}/${params.row.total_marks}`,
    },
    {
      field: "reportId",
      headerName: "Actions",
      description: "This column is not sortable.",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Fragment>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="text primary button group"
            >
              <Button endIcon={<LinkIcon />}>
                <Link
                  className={"styleLink"}
                  to={`/quiz-report/${params.row.quiz_token}`}
                >
                  Open
                </Link>
              </Button>

              <Button
                endIcon={<DeleteIcon />}
                onClick={() =>
                  deleteQuiz(
                    user && user.username,
                    params.row.quiz_token,
                    "attempted"
                  )
                }
              >
                Delete
              </Button>
            </ButtonGroup>
          </Fragment>
        );
      },
    },
  ];
  const columnsC = [
    {
      field: "quiz_token",
      headerName: "ID",
      flex: 1,

      headerAlign: "center",
      align: "center",
    },

    {
      field: "date",
      type: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quiz_name",
      headerName: "Quiz Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "start_time",
      headerName: "Start Time",
      type: "time",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "duration",
      headerName: "Quiz Duration",
      type: "time",
      flex: 0.75,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => `${params.row.duration / 60} min`,
    },
    {
      field: "total_marks",
      headerName: "Quiz Marks",
      flex: 0.75,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "viewId",
      headerName: "Actions",
      description: "This column is not sortable.",
      sortable: false,
      flex: 1.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Fragment>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="text primary button group"
            >
              <Button endIcon={<LinkIcon />}>
                <Link
                  className={"styleLink"}
                  to={`/quiz-view/${params.row.quiz_token}`}
                >
                  View
                </Link>
              </Button>

              <Button
                endIcon={<DeleteIcon />}
                onClick={() =>
                  deleteQuiz(
                    user && user.username,
                    params.row.quiz_token,
                    "created"
                  )
                }
              >
                Delete
              </Button>
              <Button endIcon={<AssessmentIcon />}>
                <Link
                  className={"styleLink"}
                  to={`/quiz-result/${params.row.quiz_token}`}
                >
                  Results
                </Link>
              </Button>
            </ButtonGroup>
          </Fragment>
        );
      },
    },
  ];
  const history = useHistory();
  const params = useParams();
  const [quizSelected, updateQuizSelected] = useState("attempted");
  const [columnsM, updateColumns] = useState(columnsP);

  const onChange = (e) => {
    if (e === "attempted") {
      updateColumns(columnsP);
      updateQuizSelected("attempted");
    } else {
      updateQuizSelected("created");
      updateColumns(columnsC);
    }
  };

  useEffect(() => {
    document.title = "Quizeal | MyQuizzes";
    myQuizzes(params.username);
  }, [myQuizzes, params.username]);
  const buttons = {
    attempted: [
      {
        name: "Refresh",
        onClick: () => myQuizzes(params.username),
      },
    ],
    created: [
      {
        name: "Refresh",
        onClick: () => myQuizzes(params.username),
      },
      {
        name: "Create Quiz",
        onClick: () => history.push("/create-quiz"),
      },
    ],
  };
  return (
    <Fragment>
      {!loading && (
        <Grid container justifyContent="center">
          <Grow in={true} timeout={2000}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="center"
                style={{ padding: "20px" }}
              >
                My Quizzes
              </Typography>
            </Grid>
          </Grow>
          <Grow in={true} timeout={1000}>
            <Grid item xs={11}>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
                style={{ paddingBottom: "10px" }}
              >
                <Button
                  variant={quizSelected === "attempted" ? "contained" : ""}
                  onClick={() => onChange("attempted")}
                >
                  Attempted
                </Button>
                <Button
                  variant={quizSelected === "created" ? "contained" : ""}
                  onClick={() => onChange("created")}
                >
                  Created
                </Button>
              </ButtonGroup>
              {quizzes[quizSelected].length ? (
                <DataGrid
                  rows={quizzes[quizSelected]}
                  columns={columnsM}
                  pageSize={10}
                  autoHeight
                  pagination
                  autoPageSize
                  disableSelectionOnClick
                  sortModel={sortModel}
                />
              ) : (
                <InfoCard
                  msg={`No ${quizSelected} Quizzes found`}
                  detail={`You have not ${quizSelected} any quiz. Pls ${
                    quizSelected === "attempted" ? "attemp" : "create"
                  } any quiz in order to
                  have record.`}
                  buttons={buttons[quizSelected]}
                  gif="noData.gif"
                />
              )}
            </Grid>
          </Grow>
        </Grid>
      )}
    </Fragment>
  );
};

MyQuizzes.propTypes = {
  myQuizzes: PropTypes.func.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  quizzes: state.quiz.quizzes,
  user: state.auth.user,
  loading: state.loading,
});

export default connect(mapStateToProps, { myQuizzes, deleteQuiz })(MyQuizzes);
