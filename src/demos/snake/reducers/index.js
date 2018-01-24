import { combineReducers } from 'redux';

import snake from './snakeReducer';

const clientReducer = combineReducers({ snake });

export default clientReducer;