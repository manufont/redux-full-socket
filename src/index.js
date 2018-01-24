import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import CounterApp from 'demos/counter';
import ArenaApp from 'demos/arena';
import SnakeApp from 'demos/snake';
import registerServiceWorker from 'registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<div>
	  	<Link to="/counter">Counter</Link> | 
	  	<Link to="/arena">Arena</Link> | 
	  	<Link to="/snake">Snake</Link>
			<Route path="/counter" component={CounterApp}/>
			<Route path="/arena" component={ArenaApp}/>
			<Route path="/snake" component={SnakeApp}/>
  	</div>
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();