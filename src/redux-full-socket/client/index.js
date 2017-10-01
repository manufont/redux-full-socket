import { createStore, applyMiddleware } from 'redux';


const id = () =>
  '_' + Math.random().toString(36).substr(2, 9);

const reducerWrapper = reducer => (state, action) => 
	action.type === 'INIT' ? action.payload : reducer(state, action);

export const initStore = (path, token, reducer, middlewares=[]) => new Promise(resolve => {

	const getWebSocket = token =>
		new WebSocket(
			`${path}?token=${token}`
		);

	let socket = getWebSocket(token);
	let seenActions = {};
	let store = null;

	const middleware = store => next => action => {
		if(action.type === 'SET_TOKEN'){
			socket.close();
			socket = getWebSocket(action.payload);
			socket.onmessage = onmessage;
		}else{
			if(!action.hide && !action.id){
				action.id = id();
				socket.send(JSON.stringify(action));
			}
			if(!action.sync && !seenActions[action.id]){
				return next(action);
			}
		}
	};

	const onmessage = message => {
   		const action = JSON.parse(message.data);
		if(action.type === 'INIT' && !store){
			store = createStore(
				reducerWrapper(reducer),
				action.payload,
				applyMiddleware(middleware, ...middlewares)
			);
			resolve(store);
		}else if(!action.id || !seenActions[action.id]){
			store.dispatch(action);
			if(action.id){
				seenActions[action.id] = 1;
			}
		}
	};

	socket.onmessage = onmessage;
});