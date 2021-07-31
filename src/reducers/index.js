import { combineReducers } from 'redux';
import myAlert from './myAlert';
import auth from './auth';

export default combineReducers({ myAlert, auth });
