import React from 'react';
import {
  makeStyles,
  Backdrop,
  CircularProgress,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function BackdropSpinner() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // const handleToggle = () => {
  //   setOpen(!open);
  // };

  return (
    <div>
      {/* <Button variant='outlined' color='primary' onClick={handleToggle}>
        Show backdrop
      </Button> */}
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color='primary' />
      </Backdrop>
    </div>
  );
}
