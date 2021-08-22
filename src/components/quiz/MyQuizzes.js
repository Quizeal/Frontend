import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Typography,
  Grid,
  Slide,
  Grow,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import LinkIcon from '@material-ui/icons/Link';
import DeleteIcon from '@material-ui/icons/Delete';

// REDUX
import { connect } from 'react-redux';
import { myQuizzes } from '../../actions/quiz';
import PropTypes from 'prop-types';
import { UnAuthorized } from '../../utils/extraFunctions';
import { useParams } from 'react-router';

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
    field: 'date',
    type: 'date',
    headerName: 'Date',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'quiz_name',
    headerName: 'Quiz Name',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'username',
    headerName: 'Quiz taken by',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'marks',
    headerName: 'Marks',
    type: 'number',
    flex: 0.75,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => `${params.row.marks}/${params.row.total_marks}`,
  },
  {
    field: 'reportId',
    headerName: 'Actions',
    description: 'This column is not sortable.',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <Fragment>
          <ButtonGroup
            variant='contained'
            color='primary'
            aria-label='text primary button group'
          >
            <Button endIcon={<LinkIcon />}>
              <Link
                className={'styleLink'}
                to={`/quiz-report/${params.row.quiz_token}`}
              >
                Open
              </Link>
            </Button>

            <Button
              endIcon={<DeleteIcon />}
              onClick={() => console.log('DELETED', params.row.quiz_token)}
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
  // {
  //   field: 'id',
  //   headerName: 'ID',
  //   flex: 1,

  //   headerAlign: 'center',
  //   align: 'center',
  // },

  {
    field: 'date',
    type: 'date',
    headerName: 'Date',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'quiz_name',
    headerName: 'Quiz Name',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'start_time',
    headerName: 'Start Time',
    type: 'time',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'duration',
    headerName: 'Quiz Duration',
    type: 'time',
    flex: 0.75,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'total_marks',
    headerName: 'Quiz Marks',
    flex: 0.75,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'viewId',
    headerName: 'Actions',
    description: 'This column is not sortable.',
    sortable: false,
    flex: 1.25,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <Fragment>
          <ButtonGroup
            variant='contained'
            color='primary'
            aria-label='text primary button group'
          >
            <Button endIcon={<LinkIcon />}>
              <Link
                className={'styleLink'}
                to={`/quiz-view/${params.row.quiz_token}`}
              >
                View
              </Link>
            </Button>

            <Button
              endIcon={<DeleteIcon />}
              onClick={() => console.log('DELETED', params.row.quiz_token)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Fragment>
      );
    },
  },
];

// Model for byDefault Sorting Table
const sortModel = [
  {
    field: 'date',
    sort: 'desc',
  },
];

const MyQuizzes = ({ myQuizzes, isAuthenticated, quizzes, loading }) => {
  const params = useParams();
  const [quizSelected, updateQuizSelected] = useState('attempted');
  const [columnsM, updateColumns] = useState(columnsP);

  const onChange = (e) => {
    if (e === 'attempted') {
      updateColumns(columnsP);
      updateQuizSelected('attempted');
    } else {
      updateQuizSelected('created');
      updateColumns(columnsC);
    }
  };

  useEffect(() => {
    document.title = 'Quizeal | MyQuizzes';
    if (isAuthenticated) myQuizzes(params.username);
  }, [myQuizzes, params.username, isAuthenticated]);

  if (!isAuthenticated) {
    return UnAuthorized('/');
  }

  return (
    <Fragment>
      {!loading && (
        <Grid container justifyContent='center'>
          <Grow in={true} timeout={2000}>
            <Grid item xs={12}>
              <Typography
                variant='h4'
                align='center'
                style={{ padding: '20px' }}
              >
                My Quizzes
              </Typography>
            </Grid>
          </Grow>
          <Slide in={true} timeout={1000} direction='up'>
            <Grid item xs={11}>
              <ButtonGroup
                color='primary'
                aria-label='outlined primary button group'
                style={{ paddingBottom: '10px' }}
              >
                <Button
                  variant={quizSelected === 'attempted' ? 'contained' : ''}
                  onClick={() => onChange('attempted')}
                >
                  Attempted
                </Button>
                <Button
                  variant={quizSelected === 'created' ? 'contained' : ''}
                  onClick={() => onChange('created')}
                >
                  Created
                </Button>
              </ButtonGroup>
              {/* </Slide>
            <Slide in={true} timeout={1000} direction='up'> */}
              <DataGrid
                rows={quizzes && quizzes[quizSelected]}
                columns={columnsM}
                pageSize={5}
                autoHeight
                pagination
                autoPageSize
                checkboxSelection
                disableSelectionOnClick
                sortModel={sortModel}
              />
            </Grid>
          </Slide>
        </Grid>
      )}
    </Fragment>
  );
};

MyQuizzes.propTypes = {
  myQuizzes: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  quizzes: state.quiz.quizzes,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.loading,
});

export default connect(mapStateToProps, { myQuizzes })(MyQuizzes);

// TODO
// --> Verify usernames authentication
// --> By default attempted quiz are showing no rows but works ok after switching it from created to attempted. ✔️
// --> Duration format (incorrect)
// --> On Reload go to home page and does come back to last page in this case (My Quizzes Page)
// --> Only Show data with is_active = true
