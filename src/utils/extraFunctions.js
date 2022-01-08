import { Redirect } from 'react-router-dom';
// import { setMyAlert } from '../actions/myAlert';
// import store from '../store';

export const UnAuthorized = (path) => {
  // store.dispatch(setMyAlert('Not Authorized, Please login.'));
  return <Redirect to={path} />;
};

export const shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
