import React, { Fragment } from 'react';
import { Chip, Grid } from '@material-ui/core';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded';

const OptionsStatus = (props) => {
  return (
    <Grid
      container
      justifyContent="center"
      style={{ gap: '20px', margin: '20px' }}
    >
      {props.report && (
        <Fragment>
          <Chip
            icon={
              <CheckBoxOutlineBlankRoundedIcon style={{ color: 'black' }} />
            }
            label="Marked Option"
            variant="outlined"
          />
          <Chip
            icon={<FiberManualRecordRoundedIcon style={{ color: '#e57373' }} />}
            label="Wrong Answer"
            variant="outlined"
          />
        </Fragment>
      )}
      <Chip
        icon={<FiberManualRecordRoundedIcon style={{ color: '#81c784' }} />}
        label="Correct Answer"
        variant="outlined"
      />
      <Chip
        icon={
          <FiberManualRecordRoundedIcon
            style={{ color: 'rgba(0, 0, 0, 0.12)' }}
          />
        }
        label="Not Answer"
        variant="outlined"
      />
    </Grid>
  );
};

export default OptionsStatus;
