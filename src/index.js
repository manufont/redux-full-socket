import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { initClientStoreEnhancer } from './redux-full-socket';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import clientReducer from './reducers';

const token = localStorage.getItem('token') || '';

initClientStoreEnhancer('ws://localhost:3000/rfs', token).then(storeEnhancer => {
	const store = createStore(clientReducer, storeEnhancer);
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root'));
	registerServiceWorker();
});
