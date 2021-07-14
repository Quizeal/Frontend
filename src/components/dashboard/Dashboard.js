import DashboardNavbar from './DashboardNavbar';
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  section: {
    maxWidth: '100%',
  },
  dashboard: {
    display: 'flex',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.dashboard}>
      <Hidden smDown>
        <div style={{ flexGrow: 0.5 }}>
          <DashboardNavbar />
        </div>
      </Hidden>
      <div style={{ flexGrow: 4, padding: '2rem' }}>
        Default Layout (pending)
      </div>
    </div>
  );
};

export default Dashboard;
