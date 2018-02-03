import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import RfsProvider from 'RfsProvider';

import Counter from 'demos/counter';
import counterReducer from 'demos/counter/reducers';

import Arena from 'demos/arena';
import arenaReducer from 'demos/arena/reducers';

import Snake from 'demos/snake';
import snakeReducer from 'demos/snake/reducers';

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

	render(){
		const { app, channel } = this.state;
		return (
			<div>
				<div>
					<select name='app' value={app} onChange={this.handleChange}>
						<option value='' disabled>Select an app</option>
						<option value='counter'>Counter</option>
						<option value='arena'>Arena</option>
						<option value='snake'>Snake</option>
					</select> 
					&nbsp;on channel #
					<input type='text' name='channel' value={channel} onChange={this.handleChange}/>
					{app && channel && <Link to={`/${app}/${channel}`}><button>Go</button></Link>}
				</div>
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
			</div>
		)
	}
}

export default withRouter(App);