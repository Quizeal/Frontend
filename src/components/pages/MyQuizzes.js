import React, { Fragment } from 'react';
import { Button, ButtonGroup, Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LinkIcon from '@material-ui/icons/Link';
import { DataGrid } from '@material-ui/data-grid';
import { dummyUserJSON } from '../../data';
import { useState, useEffect } from 'react';

const columnsP = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,

    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'date',
    type: 'date',
    headerName: 'Date',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'quizName',
    headerName: 'Quiz Name',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'teacherName',
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
    valueGetter: (params) =>
      `${params.row.marksObtained}/${params.row.quizMarks} `,
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
        <Link to={`/report/${params.id}`}>
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
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,

    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'date',
    type: 'date',
    headerName: 'Date',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'quizName',
    headerName: 'Quiz Name',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'teacherName',
    headerName: 'Quiz taken by',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'quizDuration',
    headerName: 'Quiz Duration',
    type: 'time',
    flex: 0.75,
    headerAlign: 'center',
    align: 'center',
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, 'marksObtained')}/${params.getValue(
    //     params.id,
    //     'quizMarks'
    //   )} `,
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
        <Link to={`/report/${params.id}`}>
          <Button
            variant='contained'
            color='primary'
            endIcon={<LinkIcon />}
            fullWidth
          >
            View
          </Button>
        </Link>
      );
    },
  },
];
const rows = dummyUserJSON.quizTaken;

const rowsP = rows.filter((row) => row.quizGiven);
const rowsC = rows.filter((row) => !row.quizGiven);

const sortModel = [
  {
    field: 'date',
    sort: 'desc',
  },
];

export default function MyQuizes() {
  const [columnsM, updateColumns] = useState(columnsP);
  const [rowsM, updateRows] = useState(rowsP);
  const [quizSelected, updateQuizSelected] = useState('past');

  const onChange = (e) => {
    if (e === 'past') {
      updateColumns(columnsP);
      updateRows(rowsP);
      updateQuizSelected('past');
    } else {
      updateColumns(columnsC);
      updateRows(rowsC);
      updateQuizSelected('created');
    }
  };

  useEffect(() => {
    document.title = 'Quizeal | My Quizzes';
  }, []);

  //   const variationP = quizSelected === 'past' ? 'outlined' : ''

  return (
    <Fragment>
      <Grid container justify='center'>
        <Grid item xs={12}>
          <Typography variant='h4' align='center' style={{ padding: '20px' }}>
            My Quizzes
          </Typography>
        </Grid>
        <Grid item sm={10} md={8}>
          <ButtonGroup
            color='primary'
            aria-label='outlined primary button group'
            style={{ paddingBottom: '10px' }}
          >
            <Button
              variant={quizSelected === 'past' ? 'contained' : ''}
              onClick={() => onChange('past')}
            >
              Past
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
            // components={{
            //   Toolbar: GridToolbar,
            // }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
