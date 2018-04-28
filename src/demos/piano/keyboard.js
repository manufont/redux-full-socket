import React from 'react';
import PropTypes from 'prop-types';


const flatten = arr => (
	arr.reduce((acc, val) => acc.concat(val), [])
);

const groupBy = lambda => array => (
    array.reduce((result, item) => ({
        ...result,
        [lambda(item)]: [
            ...(result[lambda(item)] || []),
            item,
        ]
    }), {})
);

const values = object => (
    Object.keys(object).map(key => object[key])
)

const octaveTones = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const getPureTone = note => (
	note.replace('#', '')[0]
);

const getOctave = note => (
	parseInt(note.replace('#', '').substr(1), 0)
);

const keysFromOctave = octave => (
	octaveTones.map(tone => tone + octave)
);


const keyCodeToNote = {
	KeyQ: 'C4', Digit2: 'C#4',
	KeyW: 'D4', Digit3: 'D#4',
	KeyE: 'E4',
	KeyR: 'F4', Digit5: 'F#4',
	KeyT: 'G4', Digit6: 'G#4',
	KeyY: 'A4', Digit7: 'A#4',
	KeyU: 'B4',
	KeyI: 'C5', Digit9: 'C#5',
	KeyO: 'D5', Digit0: 'D#5',
	KeyP: 'E5',
	BracketLeft: 'F5', Equal: 'F#5',
	BracketRight: 'G5'
}


const styles = {
	root: {
		display: 'flex',
		height: '200px'
	},
	key: pressed => ({
		border: '1px solid black',
		height: '100%',
		flex: 1,
		position: 'relative',
		cursor: 'pointer',
		backgroundColor: pressed ? '#AAA' : '#FFF'
	}),
	sharpKey: pressed => ({
		position: 'absolute',
		width: '60%',
		height: '50%',
		top: 0,
		right: '-30%',
		backgroundColor: pressed ? '#444' : '#000',
		cursor: 'pointer',
		zIndex: 1
	})
}


class Keyboard extends React.PureComponent{

	componentDidMount(){
		window.addEventListener("keydown", this.onKeydown, false);
		window.addEventListener("keyup", this.onKeyup, false);
	}

	componentWillUnmount(){
		window.removeEventListener("keydown", this.onKeydown);
		window.removeEventListener("keyup", this.onKeyup);
	}

	onKeydown = e => {
		const key = keyCodeToNote[e.code];
		if(key){
			this.pressKey(key)(e)
		}
	}

	onKeyup = e => {
		const key = keyCodeToNote[e.code];
		if(key){
			this.releaseKey(key)(e)
		}
	}

	pressKey = key => e => {
		if(!this.props.pressedKeys[key]){
			this.props.onKeyPress(key)
		}
		e.stopPropagation();
	}

	releaseKey = key => e => {
		if(this.props.pressedKeys[key]){
			this.props.onKeyRelease(key)
		}
		e.stopPropagation();
	}

	render(){
		const { octaves, pressedKeys } = this.props;

		const keys = flatten(
			octaves.map(keysFromOctave)
		);

		const groupedKeys = groupBy(key => getPureTone(key)+getOctave(key))(keys);

		return (
			<div style={styles.root}>
				{values(groupedKeys).map(([key, sharpKey], index) => (
					<div
					key={key}
					style={styles.key(pressedKeys[key])}
					onTouchStart={this.pressKey(key)}
					onMouseDown={this.pressKey(key)}
					onTouchEnd={this.releaseKey(key)}
					onMouseUp={this.releaseKey(key)}>
						{sharpKey && (
							<div
								style={styles.sharpKey(pressedKeys[sharpKey])}
								onTouchStart={this.pressKey(sharpKey)}
								onMouseDown={this.pressKey(sharpKey)}
								onTouchEnd={this.releaseKey(sharpKey)}
								onMouseUp={this.releaseKey(sharpKey)}
							/>
						)}
					</div>
				))}
			</div>
		);
	}
}

Keyboard.propTypes = {
	octaves: PropTypes.arrayOf(PropTypes.number).isRequired,
	onKeyPress: PropTypes.func.isRequired,
	onKeyRelease: PropTypes.func.isRequired,
	pressedKeys: PropTypes.object.isRequired
}

export default Keyboard;