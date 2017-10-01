import { combineReducers } from 'redux';

import counter from './counterReducer';

const appReducer = combineReducers({ counter });

export default appReducer;