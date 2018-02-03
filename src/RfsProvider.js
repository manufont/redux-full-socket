import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import initClientStoreEnhancer from 'lib';

const getSocketURL = socket =>
	(window.location.protocol === 'https' ? 'wss' : 'ws') +
	'://' + window.location.host + process.env.REACT_APP_BASE_ROUTE + socket;

class RfsProvider extends Component {

	constructor(props){
		super(props);

		this.state = {
			activeChannel: null,
			error: false
		}
	}

	initRfs = channel => {
		const { url, reducer } = this.props;
		this.displayConnectionError = setTimeout(() =>
			this.setState({
				error: true
			}),
			500
		);

		initClientStoreEnhancer(getSocketURL(url), channel).then(storeEnhancer => {
			clearTimeout(this.displayConnectionError);
			this.store = createStore(reducer, storeEnhancer);
			this.setState({
				activeChannel: channel
			})
		});
	}

	componentWillReceiveProps(nextProps){
		const nextChannel = nextProps.channel;
		if(nextChannel !== this.state.activeChannel){
			this.onChannelChange(nextChannel)
		}
	}

	onChannelChange = channel => {
		this.store.dispatch({
			type: 'RFS_SET_CHANNEL',
			payload: channel
		});
		this.setState({
			activeChannel: channel
		});
	}

	componentWillMount(){
		const { channel } = this.props;

		this.initRfs(channel);
	}

	componentWillUnmount(){
		this.store.dispatch({
			type: 'RFS_CLOSE'
		});
	}

	render() {
		const { activeChannel, error } = this.state;

		if(error){
			return <div>Cannot connect to server</div>;
		}else if(activeChannel){
			return (
				<Provider store={this.store}>
					{this.props.children}
				</Provider>
			);
		}else{
			return <div>Connecting...</div>;
		}
	}
}

RfsProvider.propTypes = {
	children: PropTypes.node.isRequired,
	url: PropTypes.string.isRequired,
	reducer: PropTypes.func.isRequired,
	channel: PropTypes.string.isRequired
}

export default RfsProvider;
