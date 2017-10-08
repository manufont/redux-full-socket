import { combineReducers } from 'redux';

import counter from './counterReducer';

const clientReducer = combineReducers({ counter });

export default clientReducer;