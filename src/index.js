import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { initStore } from './redux-full-socket';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import appReducer from './reducers';

const token = localStorage.getItem('token') || '';

initStore('ws://localhost:3000/rfs', token, appReducer).then(store => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root'));
	registerServiceWorker();
});
