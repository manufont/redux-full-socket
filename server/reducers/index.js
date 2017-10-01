import { combineReducers } from 'redux';

import counter from './globalCounter';

const serverReducer = combineReducers({ counter });

export default serverReducer;