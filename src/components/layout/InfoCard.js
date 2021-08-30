import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import CopyClipboard from './CopyClipboard';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

export default function InfoCard(props) {
  const classes = useStyles();

  return (
    <Grid container justifyContent='center'>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`/static/images/${props.gif}`}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.msg}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.detail}
          </Typography>
        </CardContent>
        {props.copyClipboard && <CopyClipboard copyText={props.copyText} />}
        <CardActions>
          {props.buttons &&
            props.buttons.map((b) => {
              return (
                <Button
                  size='small'
                  variant='contained'
                  color='primary'
                  onClick={b.onClick}
                >
                  {b.name}
                </Button>
              );
            })}
        </CardActions>
      </Card>
    </Grid>
  );
}
