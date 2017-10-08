import { serverStoreEnhancer, startServer } from './redux-full-socket';
import { createStore } from 'redux';
import clientReducer from '../src/reducers';
import serverReducer from './reducers';

const store = createStore(serverReducer, serverStoreEnhancer('./data.json', clientReducer));

const server = startServer(store, { port: 4000 });

console.log('All good, server running.');