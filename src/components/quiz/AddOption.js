import React from 'react';
import {
  Switch,
  TextField,
  Grid,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';

// Customized Styling of Material UI Components
const useStyles = makeStyles((theme) => ({
  option: {
    margin: theme.spacing(2),
    padding: 0,
    alignItems: 'center',
    flexGrow: 1,
  },
  optionStyle: {
    flexGrow: 1,
  },
  deleteOption: {
    cursor: 'pointer',
    marginLeft: '10px',
  },
}));

export default function AddOption(props) {
  const classes = useStyles();
  return (
    <Grid item className={classes.option} xs={11} sm={11} md={8} lg={6}>
      <TextField
        id='basic'
        label={`Option ${props.number + 1}`}
        variant='outlined'
        name={props.number}
        multiline
        value={props.option.data}
        className={classes.optionStyle}
        onChange={(e) => props.updateOption(e)}
      />
      <Tooltip
        title='Turn ON, if this is the correct option.'
        aria-label='add'
        placement={'top'}
      >
        <Switch
          checked={props.option.ans}
          onChange={(e) => props.updateOption(e, 'toggleAnswer')}
          name={props.number}
          color='primary'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </Tooltip>
      {props.count > 1 ? (
        <Tooltip title='Delete Option' aria-label='add' placement={'top'}>
          <IconButton
            aria-label='delete'
            onClick={() => props.deleteOption(props.option.id)}
          >
            <CancelSharpIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ''
      )}
    </Grid>
  );
}
