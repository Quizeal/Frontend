import { combineReducers } from 'redux';
import myAlert from './myAlert';
import auth from './auth';
import quiz from './quiz';
import loading from './loading';

export default combineReducers({ myAlert, auth, quiz, loading });
