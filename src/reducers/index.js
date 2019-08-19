import authReducer from './authReducer';
import errorReducer from './errorReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: authReducer,
  error: errorReducer
});

export default rootReducer;
