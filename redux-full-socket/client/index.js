import { createStore, applyMiddleware, compose } from 'redux';


const id = () =>
  '_' + Math.random().toString(36).substr(2, 9);

const reducerWrapper = reducer => (state, action) => 
	action.type === 'INIT' ? action.payload : reducer(state, action);



export const initClientStoreEnhancer = (path, token) => new Promise(resolve => {

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
			resolve(next => (reducer, initialState={}, enhancer) => {
				store = next(
					reducerWrapper(reducer),
					action.payload || initialState,
					enhancer ? compose(applyMiddleware(middleware), enhancer) : applyMiddleware(middleware)
				);
				return store;
			})
		}else if(!action.id || !seenActions[action.id]){
			store.dispatch(action);
			if(action.id){
				seenActions[action.id] = 1;
			}
		}
	};

	socket.onmessage = onmessage;
});
