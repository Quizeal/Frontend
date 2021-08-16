import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Typography, Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';

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
    headerName: 'Report Link',
    description: 'This column is not sortable.',
    sortable: false,
    flex: 1.25,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <Link to={`/quiz-report/${params.row.quiz_token}`}>
          <Button
            variant='contained'
            color='primary'
            endIcon={<LinkIcon />}
            fullWidth
          >
            Open
          </Button>
        </Link>
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
    headerName: 'View Quiz',
    description: 'This column is not sortable.',
    sortable: false,
    flex: 1.25,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <Link to={`/quiz-view/${params.row.quiz_token}`}>
          <Button
            variant='contained'
            color='primary'
            endIcon={<DescriptionIcon />}
            fullWidth
          >
            View
          </Button>
        </Link>
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

const MyQuizzes = ({ myQuizzes, isAuthenticated, quizzes }) => {
  const params = useParams();
  const [quizSelected, updateQuizSelected] = useState('attempted');
  const [columnsM, updateColumns] = useState(columnsP);
  const [rowsM, updateRows] = useState([]);

  const onChange = (e) => {
    if (e === 'attempted') {
      updateColumns(columnsP);
      updateQuizSelected('attempted');
      updateRows(quizzes.attempted);
    } else {
      updateQuizSelected('created');
      updateColumns(columnsC);
      updateRows(quizzes.created);
    }
  };

  useEffect(() => {
    document.title = 'Quizeal | MyQuizzes';
    myQuizzes(params.username);
  }, [myQuizzes, params.username]);

  if (!isAuthenticated) {
    return UnAuthorized('/');
  }

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12}>
        <Typography variant='h4' align='center' style={{ padding: '20px' }}>
          My Quizzes
        </Typography>
      </Grid>
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
        <DataGrid
          rows={rowsM}
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
    </Grid>
  );
};

MyQuizzes.propTypes = {
  myQuizzes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  quizzes: state.quiz.quizzes,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { myQuizzes })(MyQuizzes);

// TODO
// --> Verify usernames authentication
