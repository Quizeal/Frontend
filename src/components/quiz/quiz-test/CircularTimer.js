import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@material-ui/core';

function CircularProgressWithLabel(props) {
  return (
    <Box position='relative' display='inline-flex'>
      <CircularProgress size='10rem' variant='determinate' {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography
          variant='body1'
          component='div'
          color='textSecondary'
          style={{ fontSize: '4rem', fontWeight: 'lighter' }}
        >{`${Math.round(props.value)}`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CircularTimer() {
  const [progress, setProgress] = React.useState(0);

  //   if not submitted before time then it will automatically submit the responses

  //   const completed = () => {
  //     console.log('Test Completed');
  //   };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 5
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}
