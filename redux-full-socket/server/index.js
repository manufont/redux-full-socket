import { createStore, combineReducers, applyMiddleware } from 'redux';
import fs from 'fs';
import WebSocket from 'ws';
import url from 'url';

const dispatchToClient = reducer => (state = {}, action) => ({
  ...state,
  [action.token]: reducer(state[action.token], action)
});

export const serverStoreEnhancer = (path, clientReducer) => {

  return next => (reducer, initialState={}, enhancer) => {
    const reducers = combineReducers({
      clients: dispatchToClient(clientReducer),
      server: reducer
    });

    const savedStore = fs.existsSync(path)
      ? JSON.parse(fs.readFileSync(path, 'utf-8'))
      : initialState;

    const store = next(reducers, savedStore, enhancer);
    store.subscribe(() =>
      fs.writeFile(path, JSON.stringify(store.getState()), 'utf-8', ()=>{})
    );

    return store;
  }
}


const init = (store, token) => ({
  type: 'INIT',
  payload: store.getState().clients[token],
  hide: true
});


const cleanAction = action => ({
  ...action,
  hide: undefined,
  broadcast: undefined,
  token: undefined,
  sync: undefined
})


const augmentAction = (action, token, socketId) => ({
  ...action,
  token,
  socketId
})

const id = () =>
  '_' + Math.random().toString(36).substr(2, 9);


export const startServer = (store, socketOptions) => {
  const socketServer = new WebSocket.Server(socketOptions);

  const tokenMap = {};

  socketServer.on('connection', (socket, request) => {

    const token = url.parse(request.url, true).query.token;

    const send = action => {
      const message = JSON.stringify(cleanAction(action));
      if(action.broadcast){
        Object.keys(tokenMap[token]).forEach( key => {
          if(action.sync || action.socketId !== key){
            tokenMap[token][key].send(message)
          }
        });
      }else if(action.sync){
        socket.send(message);
      }
    }

    const socketId = id();
    if(!tokenMap[token]) tokenMap[token] = {};
    tokenMap[token][socketId] = socket;
    socket.send(JSON.stringify(init(store, token)));

    socket.on('message', message => {
      const action = store.dispatch(augmentAction(JSON.parse(message), token, socketId));
      send(action);
    });

    socket.on('close', () => {
      delete tokenMap[token][socketId];
    })
  });

  return socketServer
}