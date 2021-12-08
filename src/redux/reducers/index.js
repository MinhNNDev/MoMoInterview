import {combineReducers} from 'redux';

import auth from './auth';
import asset from './asset'

const rootReducer = combineReducers({auth, asset});

export default rootReducer;