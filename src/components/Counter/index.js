import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as counterActions from './actions';

class Counter extends Component {
	constructor(props){
		super(props);

		this.state = {
			sync: false,
			hide: false,
			broadcast: false,
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.checked
		});
	}

	inc = () => {
		this.props.actions.inc(this.state);
	}

	dec = () => {
		this.props.actions.dec(this.state);
	}

	render(){
		return (
			<div>
				<label>dispatch at server response (sync)<input type="checkbox" name="sync" onChange={this.handleChange} /></label><br/>
				<label>hide from server (hide)<input type="checkbox" name="hide" onChange={this.handleChange} /></label><br/>
				<label>dispatch on clients sharing same token (broadcast)<input type="checkbox" name="broadcast" onChange={this.handleChange} /></label><br/>
				{this.props.value}
				<button onClick={this.inc}>inc</button>
				<button onClick={this.dec}>dec</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(counterActions, dispatch)
});

const mapStateToProps = state => ({
	value: state.counter.value
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter);