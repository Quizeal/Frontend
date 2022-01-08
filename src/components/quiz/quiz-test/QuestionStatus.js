import React from 'react';
import { Chip, Grid } from '@material-ui/core';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';

const QuestionStatus = (props) => {
  return (
    <Grid
      container
      justifyContent="center"
      style={{ gap: '20px', margin: '20px 0' }}
    >
      <Chip
        icon={
          <FiberManualRecordRoundedIcon
            style={{ color: 'rgba(111, 49, 154, 1)' }}
          />
        }
        label="Attempted"
        variant="outlined"
      />
      <Chip
        icon={
          <FiberManualRecordRoundedIcon
            style={{ color: 'rgba(0, 152, 186, 1)' }}
          />
        }
        label="Not Attempted"
        variant="outlined"
      />
    </Grid>
  );
};

export default QuestionStatus;
