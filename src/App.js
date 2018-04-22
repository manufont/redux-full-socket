import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import RfsProvider from 'RfsProvider';

import Counter from 'demos/counter';
import counterReducer from 'demos/counter/reducers';

import Arena from 'demos/arena';
import arenaReducer from 'demos/arena/reducers';

import Snake from 'demos/snake';
import snakeReducer from 'demos/snake/reducers';

import Piano from 'demos/piano';
import pianoReducer from 'demos/piano/reducers';

class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			app: props.match.params.app || '',
			channel: props.match.params.channel
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	goToApp = e => {
		e.preventDefault();
		const { app, channel } = this.state;
		this.props.history.push(`/${app}/${channel}`)
		return false;
	}

	render(){
		const { app, channel } = this.state;
		return (
			<div>
				<form onSubmit={this.goToApp}>
					<select name='app' value={app} onChange={this.handleChange} required>
						<option value='' disabled>Select an app</option>
						<option value='counter'>Counter</option>
						<option value='arena'>Arena</option>
						<option value='snake'>Snake</option>
						<option value='piano'>Piano</option>
					</select> 
					&nbsp;on channel #
					<input type='text' name='channel' value={channel} onChange={this.handleChange} required/>
					<input type='submit' value='Go' />
				</form>
				<Route exact path="/counter/:channel" render={({ match }) => (
					<RfsProvider url='/rfs-counter' reducer={counterReducer} channel={match.params.channel}>
						<Counter />
					</RfsProvider>
				)}/>
				<Route exact path="/arena/:channel" render={({ match }) => (
					<RfsProvider url='/rfs-arena' reducer={arenaReducer} channel={match.params.channel}>
						<Arena />
					</RfsProvider>
				)}/>
				<Route exact path="/snake/:channel" render={({ match }) => (
					<RfsProvider url='/rfs-snake' reducer={snakeReducer} channel={match.params.channel}>
						<Snake />
					</RfsProvider>
				)}/>
				<Route exact path="/piano/:channel" render={({ match }) => (
					<RfsProvider url='/rfs-piano' reducer={pianoReducer} channel={match.params.channel}>
						<Piano />
					</RfsProvider>
				)}/>
			</div>
		)
	}
}

export default withRouter(App);