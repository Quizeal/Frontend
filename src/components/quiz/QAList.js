import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
  Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default function QAList(props) {
  const classes = useStyles();
  const edit = props.edit;

  const { question_name, options } = props.qaSet;

  const validateAnswer = (ans, marked) => {
    if (ans) return 'success';
    if (ans !== marked && props.report) return 'danger';
    return '';
  };

  return (
    <Slide in={true} direction='up' timeout={1000 * (props.i + 1)}>
      <Card className={classes.qACard} variant='outlined'>
        <CardContent>{question_name}</CardContent>
        <Divider />
        <Grid container className={classes.root}>
          {options.map((option, index) => {
            return (
              <div className={classes.option} key={index}>
                <Button
                  variant='contained'
                  disabled
                  size='small'
                  // color='primary'
                  className={`${option.is_marked && 'outlined-answer'} ${
                    classes.optionStyle
                  } ${validateAnswer(option.is_correct, option.is_marked)} `}
                >
                  {option.option_name}
                </Button>
              </div>
            );
          })}
        </Grid>
        {/* <Divider /> */}
        {edit ? (
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
    </Slide>
  );
}
