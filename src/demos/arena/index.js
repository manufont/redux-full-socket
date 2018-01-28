import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import initClientStoreEnhancer from 'lib';
import clientReducer from './reducers';
import { Auth, Arena } from './components';


class ArenaApp extends Component {

	constructor(props){
		super(props);

		this.state = {
			ready: false,
			error: false
		}
	}

	componentWillMount(){
		const token = localStorage.getItem('token') || '';

		this.displayConnectionError = setTimeout(() =>
			this.setState({
				error: true
			}),
			500
		);

		initClientStoreEnhancer('ws://localhost:3000/rfs-arena', token).then(storeEnhancer => {
			clearTimeout(this.displayConnectionError);
			this.store = createStore(clientReducer, storeEnhancer);
			this.setState({
				ready: true
			})
		});
	}

	render() {
		const { ready, error } = this.state;

		if(error){
			return <span>Cannot connect to server</span>;
		}else if(ready){
			return (
				<Provider store={this.store}>
					<div>
							<Auth />
							<Arena />
						</div>
				</Provider>
			);
		}else{
			return <span>Connecting...</span>;
		}
	}
}

export default ArenaApp;
