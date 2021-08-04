import { combineReducers } from 'redux';
import { responsiveStateReducer as browser } from 'redux-responsive';
import registration from './registration';
import status from './status';

export default combineReducers({
    browser,
    registration,
    status
});