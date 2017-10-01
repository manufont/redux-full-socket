import { initServerStore, startServer } from '../src/redux-full-socket';
import clientReducer from '../src/reducers';
import serverReducer from './reducers';

const store = initServerStore('./data.json', clientReducer, serverReducer);

const server = startServer(store, { port: 4000 });

console.log('All good, server running.');