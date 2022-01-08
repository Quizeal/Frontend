import React, { useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Grow } from '@material-ui/core';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@material-ui/data-grid';
import InfoCard from '../layout/InfoCard';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { quizResult } from '../../actions/quiz';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

// Model for byDefault Sorting Table
const sortModel = [
  {
    field: 'marks',
    sort: 'desc',
  },
];

const column = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,

    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'username',
    type: 'id',
    headerName: 'Username',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'marks',
    headerName: 'Marks',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'rank',
    headerName: 'Rank',
    flex: 0.75,
    headerAlign: 'center',
    align: 'center',
  },
];

const QuizResult = ({ quizResult, loading, user, get_quiz_result }) => {
  // Columns of Table

  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    document.title = 'Quizeal | Quiz Result';
    quizResult(user && user.username, params.quiz_id);
  }, [quizResult, params.quiz_id, user]);

  const buttons = [
    {
      name: 'Create Quiz',
      onClick: () => history.push('/create-quiz'),
    },
  ];

  return (
    <Fragment>
      {!loading && (
        <Grid container justifyContent="center">
          <Grow in={true} timeout={2000}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="center"
                style={{ padding: '20px' }}
              >
                Quiz Result
              </Typography>
            </Grid>
          </Grow>
          <Grow in={true} timeout={1000}>
            <Grid item xs={11}>
              {get_quiz_result && get_quiz_result.students.length ? (
                <DataGrid
                  components={{ Toolbar: CustomToolbar }}
                  rows={get_quiz_result.students}
                  columns={column}
                  pageSize={10}
                  autoHeight
                  pagination
                  autoPageSize
                  checkboxSelection
                  sortModel={sortModel}
                  disableSelectionOnClick
                />
              ) : (
                <InfoCard
                  msg={
                    get_quiz_result
                      ? 'No Students has given this Quiz.'
                      : 'Quiz Does not Exists.'
                  }
                  detail={
                    get_quiz_result
                      ? 'Please share the quiz code.'
                      : 'Please create Quiz.'
                  }
                  copyClipboard={get_quiz_result}
                  copyText={params.quiz_id}
                  gif="noData.gif"
                  buttons={buttons}
                />
              )}
            </Grid>
          </Grow>
        </Grid>
      )}
    </Fragment>
  );
};

QuizResult.propTypes = {
  quizResult: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  get_quiz_result: state.quiz.get_quiz_result,
  user: state.auth.user,
  loading: state.loading,
});

export default connect(mapStateToProps, { quizResult })(QuizResult);
