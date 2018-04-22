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

const octave4 = {
	'C': 261.63,
	'C#': 277.18,
	'D': 293.66,
	'D#': 311.13,
	'E': 329.63,
	'F': 349.23,
	'F#': 369.99,
	'G': 392,
	'G#': 415.31,
	'A': 440,
	'A#': 466.16,
	'B': 493.88
};

const octaveTones = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const getFrequency = (tone, octave) => (
	octave4[tone] * Math.pow(2, octave - 4)
);

const isKeySharp = key => (
	key.indexOf('#') !== -1
);

const getTone = key => (
	key.replace('#', '')[0] + (isKeySharp(key) ? '#' : '')
);

const getPureTone = note => (
	note.replace('#', '')[0]
);

const getOctave = note => (
	parseInt(note.replace('#', '').substr(1), 0)
);

const frequencyFromNote = note => {
	return getFrequency(getTone(note), getOctave(note));
}

const keysFromOctave = octave => (
	octaveTones.map(tone => tone + octave)
);


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