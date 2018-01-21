import { combineReducers } from 'redux';

import arena from './arenaReducer';

const clientReducer = combineReducers({ arena });

export default clientReducer;