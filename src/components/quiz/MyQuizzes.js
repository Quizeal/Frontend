import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Typography, Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
// import { dummyUserJSON } from '../../data';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import { myQuizzes } from '../../apiHandlers.js/quiz';
import Loading from '../layout/Loading';

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
    valueGetter: (params) => `${params.row.marks}/${params.row.total_marks} `,
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
        <Link to={`/quiz-report/${params.id}`}>
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
    field: 'quiz_marks',
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
        <Link to={`/quiz-view/${params.id}`}>
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

export default function MyQuizzes(props) {
  const [quizSelected, updateQuizSelected] = useState('attempted');
  const [columnsM, updateColumns] = useState(columnsP);
  const [server, setServer] = useState({ data: '', loading: true });
  const [rowsM, updateRows] = useState([]);

  const onChange = (e) => {
    if (e === 'attempted') {
      updateColumns(columnsP);
      updateRows(server.data.attempted);
      updateQuizSelected('attempted');
    } else {
      updateColumns(columnsC);
      updateRows(server.data.created);
      updateQuizSelected('created');
    }
  };

  const getQuizzes = async () => {
    const res = await myQuizzes();
    setServer({ ...server, data: res, loading: false });
    updateRows(res.attempted);
  };

  useEffect(() => {
    document.title = 'Quizeal | Home';
    getQuizzes();
  }, []);

  const { loading } = server;

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {rowsM ? (
            <Grid container justifyContent='center'>
              <Grid item xs={12}>
                <Typography
                  variant='h4'
                  align='center'
                  style={{ padding: '20px' }}
                >
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
          ) : (
            'DATA NOT FOUND'
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
