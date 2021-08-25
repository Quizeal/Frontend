import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// REDUX
import { connect } from 'react-redux';

const AuthBox = ({ statusCode }) => {
  const [open, setOpen] = React.useState(statusCode === 401);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Please Login to Continue.
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='SID / Email'
            fullWidth
          />
          <TextField
            margin='dense'
            id='password'
            label='Password'
            type='password'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary' variant='contained'>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// AuthBox.propTypes = {
//   statusCode: pt,
// };

const mapStateToProps = (state) => ({
  statusCode: state.auth.statusCode,
});

export default connect(mapStateToProps)(AuthBox);
