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

	setToken = e => {
		e.preventDefault();
		localStorage.setItem('token', this.state.token);
		this.props.actions.setToken(this.state.token);
		return false;
	}

	render(){

		return (
			<form onSubmit={this.setToken}>
				<input
					type='text'
					name='token'
					placeholder='token'
					value={this.state.token || ''}
					onChange={this.onTokenChange}
				/>
				<input type="submit" value="Set arena" />
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authActions, dispatch)
});

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);