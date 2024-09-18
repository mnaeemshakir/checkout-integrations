import { combineReducers } from 'redux';

import snackbar from './snackbar';
import user from './user';
import coupon from './coupon';
import general from './general';

export default combineReducers({ snackbar, user, coupon, general });
