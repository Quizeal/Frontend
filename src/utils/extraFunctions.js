import { Redirect } from 'react-router-dom';
// import { setMyAlert } from '../actions/myAlert';
// import store from '../store';

export const UnAuthorized = (path) => {
  // store.dispatch(setMyAlert('Not Authorized, Please login.'));
  return <Redirect to={path} />;
};
