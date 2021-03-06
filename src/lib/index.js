import { applyMiddleware, compose } from 'redux';


const id = () =>
  '_' + Math.random().toString(36).substr(2, 9);

const reducerWrapper = reducer => (state, action) => 
	reducer(action.type === 'INIT' ? action.payload : state, action);



const initClientStoreEnhancer = (path, channel) => new Promise(resolve => {

	const getWebSocket = channel =>
		new WebSocket(
			`${path}?channel=${channel}`
		);

	let socket = getWebSocket(channel);
	let seenActions = {};
	let store = null;

	const middleware = store => next => action => {
		if(action.type === 'RFS_SET_CHANNEL'){
			socket.close();
			socket = getWebSocket(action.payload);
			socket.onmessage = onmessage;
		}else if(action.type === 'RFS_CLOSE'){
			socket.close();
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
					compose(
						applyMiddleware(middleware),
						...enhancer ? [enhancer] : []
					)
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

export default initClientStoreEnhancer;