import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';

const mainReducer = combineReducers({
    form,
    auth
});

export default mainReducer;
