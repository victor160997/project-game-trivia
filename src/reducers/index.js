import { combineReducers } from 'redux';
import user from './user';
import placar from './placar';

const rootReducer = combineReducers({
  user, placar,
});

export default rootReducer;
