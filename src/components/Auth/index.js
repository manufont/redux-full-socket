import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from './actions';

class Auth extends Component {

	constructor(props){
		super(props);

		this.state = {
			token: localStorage.getItem('token')
		}
	}

	onTokenChange = (event) => {
		const token = event.target.value;
		this.setState({ token });
	}

	setToken = () => {
		localStorage.setItem('token', this.state.token);
		this.props.actions.setToken(this.state.token);
	}

	render(){

		return (
			<div>
				<input
					type='text'
					name='token'
					placeholder='token'
					value={this.state.token || ''}
					onChange={this.onTokenChange}
				/>
				<button onClick={this.setToken}>
					set token
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authActions, dispatch)
});

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);