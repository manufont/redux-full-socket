import startServer, { serverStoreEnhancer } from 'redux-full-socket-server';
import { createStore } from 'redux';
import counterClientReducer from '../src/demos/counter/reducers';
import arenaClientReducer from '../src/demos/arena/reducers';
import snakeClientReducer from '../src/demos/snake/reducers';
import counterServerReducer from './reducers';

const counterStore = createStore(counterServerReducer, serverStoreEnhancer(counterClientReducer, 'rfs-counter:'));
const counterServer = startServer(counterStore, { port: 4000 });
console.log('All good, counter server running.');

const arenaStore = createStore(counterServerReducer, serverStoreEnhancer(arenaClientReducer, 'rfs-arena:'));
const arenaServer = startServer(arenaStore, { port: 4001 });
console.log('All good, arena server running.');

const snakeStore = createStore(counterServerReducer, serverStoreEnhancer(snakeClientReducer, 'rfs-snake:'));
const snakeServer = startServer(snakeStore, { port: 4002 });
console.log('All good, snake server running.');