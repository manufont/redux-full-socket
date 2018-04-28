import React from 'react';
import PropTypes from 'prop-types';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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

const getFrequency = (tone, octave) => (
	octave4[tone] * Math.pow(2, octave - 4)
);

const isKeySharp = key => (
	key.indexOf('#') !== -1
);

const getTone = key => (
	key.replace('#', '')[0] + (isKeySharp(key) ? '#' : '')
);

const getOctave = key => (
	parseInt(key.replace('#', '').substr(1), 0)
);

const frequencyFromKey = key => {
	return getFrequency(getTone(key), getOctave(key));
}

class Sound extends React.PureComponent{

	componentDidMount(){
		this.oscillator = audioCtx.createOscillator();	
	    this.oscillator.type = 'sine';
	    this.oscillator.frequency.setValueAtTime(this.props.frequency, audioCtx.currentTime); // value in hertz
	    this.gainNode = audioCtx.createGain();
		this.gainNode.gain.setValueAtTime(1.0, audioCtx.currentTime);
	    this.gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
	    this.oscillator.connect(this.gainNode);
	    this.gainNode.connect(audioCtx.destination);
	    this.oscillator.start();
	}

	componentWillUnmount(){
		this.oscillator.stop();
	}

	render(){
		return null;
	}
}

const Synthesizer = ({ pressedKeys }) => (
	<div>
		{Object.keys(pressedKeys).map(key => (
			<Sound key={key} frequency={frequencyFromKey(key)} />
		))}
	</div>
);

Synthesizer.propTypes = {
	pressedKeys: PropTypes.object.isRequired
}

export default Synthesizer;