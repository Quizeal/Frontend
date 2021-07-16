import { Fragment } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  CardActions,
} from '@material-ui/core';

const Setting = () => {
  return (
    <Fragment>
      <Card style={{ margin: '20px' }}>
        <CardContent>
          <Typography variant='h5' color='error'>
            Change Password
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            id='outlined-basic'
            label='Confirm Password'
            variant='outlined'
            fullWidth
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            style={{ backgroundColor: '#f44336' }}
          >
            Update
          </Button>
        </CardActions>
      </Card>
      <Card style={{ margin: '20px' }}>
        <CardContent>
          <Typography variant='h5' color='error'>
            Delete Account
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            id='outlined-basic'
            label='Confirm Password'
            variant='outlined'
            fullWidth
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            style={{ backgroundColor: '#f44336' }}
          >
            Delete Account
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default Setting;
