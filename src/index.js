import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';

ReactDOM.render(
	<BrowserRouter basename={process.env.REACT_APP_BASE_ROUTE}>
		<Route path="/:app?/:channel?" component={App}/>
	</BrowserRouter>,
	document.getElementById('root')
);