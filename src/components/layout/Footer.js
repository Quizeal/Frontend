import React, { Fragment } from 'react';
import { Grid, Typography, makeStyles, Box } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  footer: {
    flexGrow: 1,
    backgroundColor: '#24313f',
    color: 'white',
    padding: '30px',
    marginTop: '-5px',
  },
  position: {
    width: '100%',
  },
  content: {
    paddingTop: '80px !important',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.position}>
        <div className="custom-shape-divider-bottom-footer">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className={classes.footer}>
          <Grid
            container
            spacing={1}
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={10} md={5}>
              <img
                src="/static/images/illustrations/footer.svg"
                alt="footer"
                width="100%"
              />
            </Grid>
            <Grid item xs={10} md={4}>
              <Grid item xs={12}>
                <Typography variant="h2" style={{ fontWeight: 500 }}>
                  Start using Quizeal today.
                </Typography>
                <Typography variant="h5">You Know, you Grow</Typography>
              </Grid>
              <br />
              <br />
              <br />
              <Grid
                container
                justifyContent="start"
                style={{ gap: '20px' }}
                alignItems="center"
              >
                <Grid item>
                  <div>
                    <a href="/" className="style-link">
                      Home
                    </a>
                  </div>
                  <div>
                    <a href="/about" className="style-link">
                      About
                    </a>
                  </div>
                  {/* <div>
                    <a href="/developers" className="style-link">
                      Developers
                    </a>
                  </div> */}
                  <div>
                    <a href="/feedback" className="style-link">
                      Feedback
                    </a>
                  </div>
                  <div>Terms and Conditions</div>
                  <div>Privacy Policy</div>
                  <div></div>
                </Grid>
                <br />
                <br />
                <Grid item>
                  <FacebookIcon />
                  <InstagramIcon />
                  <TwitterIcon />
                  <GitHubIcon />
                  <div>Contact Us</div>
                  <div>info@example.com</div>
                  <div>+91 45781-48781</div>
                </Grid>
                <Grid item xs={12}>
                  <Box mt={8}>
                    <Typography variant="h6" align="center">
                      {'Made with'} &#10084;{' '}
                      <a
                        href="/"
                        className={'style-link'}
                        style={{ fontWeight: 700 }}
                      >
                        Quizeal.
                      </a>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
