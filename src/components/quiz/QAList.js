import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
  qACard: {
    marginBottom: '30px',
  },
  option: {
    margin: theme.spacing(2),
    padding: 0,
  },
  optionStyle: {
    textTransform: 'none',
    color: 'rgb(74, 74, 74) !important',
  },
  qActionStyle: {
    justifyContent: 'end',
  },
}));

export default function QAReport(props) {
  const classes = useStyles();
  const report = props.report;

  const { question, options } = props.qaSet;

  const validateAnswer = (ans, marked) => {
    if (ans) return 'success';
    else if (ans !== marked && props.type !== 'list') return 'danger';
  };

  return (
    <Card className={classes.qACard} variant='outlined'>
      <CardContent>{question}</CardContent>
      <Divider />
      <Grid container className={classes.root}>
        {options.map((option, index) => {
          return (
            <div className={classes.option}>
              <Button
                variant='contained'
                disabled
                size='small'
                color='primary'
                className={`${classes.optionStyle} ${validateAnswer(
                  option.ans,
                  option.marked
                )}`}
              >
                {option.data}
              </Button>
            </div>
          );
        })}
      </Grid>
      {/* <Divider /> */}
      {!report ? (
        <CardActions className={classes.qActionStyle}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => props.deleteQuestion(props.qaSet.id)}
          >
            Delete
          </Button>
        </CardActions>
      ) : (
        ''
      )}
    </Card>
  );
}
