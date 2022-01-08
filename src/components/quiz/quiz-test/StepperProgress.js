import React from 'react';
import { MobileStepper, Button, useTheme, makeStyles } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '100%',
    flexGrow: 1,
  },
});

export default function StepperProgress(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <MobileStepper
      variant="progress"
      steps={props.length}
      position="static"
      activeStep={props.activeStep}
      className={classes.root}
      nextButton={
        <Button
          size="small"
          onClick={props.next}
          disabled={props.activeStep === props.length - 1}
        >
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" disabled>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
