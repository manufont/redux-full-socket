import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import CounterApp from 'demos/counter';
import ArenaApp from 'demos/arena';
import registerServiceWorker from 'registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<div>
	  	<Link to="/counter">Counter</Link> | 
	  	<Link to="/arena">Arena</Link>
			<Route path="/counter" component={CounterApp}/>
			<Route path="/arena" component={ArenaApp}/>
  	</div>
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();