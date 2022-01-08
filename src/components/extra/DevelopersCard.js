import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Chip } from '@material-ui/core';
import React from 'react';
// import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
// import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    gap: theme.spacing(3),
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    margin: theme.spacing(3),
  },
  detail: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '10px',
  },
}));

const DevelopersCard = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Grid item>
        <Avatar
          src={props.avatar}
          style={{ height: '200px', width: '200px' }}
        />
      </Grid>
      <Grid
        item
        style={{ flexDirection: 'column', display: 'flex', gap: '10px' }}
      >
        <div className={classes.detail}>
          <PersonOutlineIcon /> <div>{props.name}</div>
        </div>
        {/* <div className={classes.detail}>
          <MailOutlineIcon /> <div>{props.email}</div>
        </div> */}
        <div className={classes.detail}>
          <LocationOnOutlinedIcon /> <div>{props.location}</div>
        </div>
        <div className={classes.detail}>
          <SchoolOutlinedIcon /> <div>{props.college}</div>
        </div>
        <div>
          <Chip
            icon={<GitHubIcon />}
            label={props.github}
            component="a"
            variant="outlined"
            href={`https://github.com/${props.github}`}
            clickable
          ></Chip>
          {/* <a
            target='_blank'
            rel='noreferrer'
            href={`https://linkedin.com/in/${props.linkedin}`}
          >
            <IconButton>
              <LinkedInIcon style={{ color: '#0077b5' }} />
            </IconButton>
          </a> */}
          {/* <a
            rel='noreferrer'
            target='_blank'
            href={`https://twitter.com/${props.twitter}`}
          >
            <IconButton>
              <TwitterIcon style={{ color: '#1DA1F2' }} />
            </IconButton>
          </a> */}
        </div>
      </Grid>
    </div>
  );
};

export default DevelopersCard;
