import startServer, { serverStoreEnhancer } from 'redux-full-socket-server';
import { createStore } from 'redux';
import counterClientReducer from '../src/demos/counter/reducers';
import arenaClientReducer from '../src/demos/arena/reducers';
import snakeClientReducer from '../src/demos/snake/reducers';
import pianoClientReducer from '../src/demos/piano/reducers';
import counterServerReducer from './reducers';

const counterStore = createStore(counterServerReducer, serverStoreEnhancer(counterClientReducer, 'rfs-counter:'));
const counterServer = startServer(counterStore, { port: 4000 });
console.log('All good, counter server running on port 4000.');

const arenaStore = createStore({}, serverStoreEnhancer(arenaClientReducer, 'rfs-arena:'));
const arenaServer = startServer(arenaStore, { port: 4001 });
console.log('All good, arena server running on port 4001.');

const snakeStore = createStore({}, serverStoreEnhancer(snakeClientReducer, 'rfs-snake:'));
const snakeServer = startServer(snakeStore, { port: 4002 });
console.log('All good, snake server running on port 4002.');

const pianoStore = createStore({}, serverStoreEnhancer(pianoClientReducer, 'rfs-piano:'));
const pianoServer = startServer(pianoStore, { port: 4003 });
console.log('All good, piano server running on port 4003.');