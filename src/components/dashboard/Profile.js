const Profile = (props) => {
  return (
    <Fragment>
      <Card style={{ margin: '20px' }}>
        <CardContent>
          <Typography variant='h5'>Profile</Typography>
        </CardContent>
        <Divider />
        <CardContent
          style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
        >
          <TextField
            id='outlined-basic'
            label='Name'
            variant='outlined'
            fullWidth
          />
          <TextField
            id='outlined-basic'
            label='Email Address'
            variant='outlined'
            fullWidth
          />
          <TextField
            id='outlined-basic'
            label='University/School'
            variant='outlined'
            fullWidth
          />
          <TextField
            id='outlined-basic'
            label='Course'
            variant='outlined'
            fullWidth
          />
          <TextField
            id='outlined-basic'
            label='State'
            variant='outlined'
            fullWidth
          />
          <TextField
            id='outlined-basic'
            label='Country'
            variant='outlined'
            fullWidth
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button variant='contained' color='primary'>
            Update
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default Profile;
