import { createStore, combineReducers, applyMiddleware } from 'redux';
import fs from 'fs';
import WebSocket from 'ws';
import url from 'url';


export const initStore = (path, appReducer, serverReducer, middlewares=[]) => {
  const clientsReducer = (state = {}, action) => ({
    ...state,
    [action.token]: appReducer(state[action.token], action)
  })

  const reducer = combineReducers({
    clients: clientsReducer,
    server: serverReducer
  });

  const savedStore = fs.existsSync(path)
    ? JSON.parse(fs.readFileSync(path, 'utf-8'))
    : {};

  let store = createStore(reducer, savedStore, applyMiddleware(...middlewares));

  store.subscribe(() =>
    fs.writeFile(path, JSON.stringify(store.getState()), 'utf-8', ()=>{})
  );
  return store
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


const augmentAction = (action, token, socket) => ({
  ...action,
  token,
  socket
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
          if(action.sync || action.socket !== key){
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