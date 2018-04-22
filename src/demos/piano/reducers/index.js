import { combineReducers } from 'redux';

import piano from './pianoReducer';

const clientReducer = combineReducers({ piano });

export default clientReducer;