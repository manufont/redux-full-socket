import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Keyboard from './keyboard';
import Synthesizer from './synthesizer';
import * as pianoActions from './actions';

class Piano extends Component {

	onKeyPress = key => {
		this.props.actions.pressKey(key);
	}

	onKeyRelease = key => {
		this.props.actions.releaseKey(key);
	}

	render(){
		const { pressedKeys } = this.props;

		return (
			<div>
				<Keyboard
					octaves={[3, 4, 5]}
					onKeyPress={this.onKeyPress}
					onKeyRelease={this.onKeyRelease}
					pressedKeys={pressedKeys}
				/>
				<Synthesizer
					pressedKeys={pressedKeys}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(pianoActions, dispatch)
});

const mapStateToProps = state => ({
	pressedKeys: state.piano
})

export default connect(mapStateToProps, mapDispatchToProps)(Piano);