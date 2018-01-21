import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as arenaActions from './actions';

const mod = (number, n) => ((number%n)+n)%n;

const hueFromString = str => 
	mod(str.split('').reduce((acc, val) => {
		const hash = val.charCodeAt()*17 + ((acc << 5) - acc)
		return hash & hash;
	}, 0), 360)

class Arena extends Component {

	constructor(props){
		super(props);

		this.state = {
			player: null,
			name: ''
		}
	}

	componentWillMount() {
		document.body.addEventListener('keydown', this.onKeyDown);
	}

	componentWillUnMount() {
		document.body.removeEventListener('keydown', this.onKeyDown);
	}

	onKeyDown = e => {
		console.log('key pressed.', e)
		const { up, down, left, right } = this.props.actions;
		const { player } = this.state;

		if(player){
			e = e || window.event;
			switch(e.keyCode){
				case 38:
					up(player);
					break;
				case 40:
					down(player);
					break;
				case 37:
					left(player);
					break;
				case 39:
					right(player);
					break;
				default:
					break;
			}
		}
	}

	setPlayer = player => {
		this.setState({ player });
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	addPlayer = e => {
		e.preventDefault();
		const name = this.state.name;
		if(name){
			if(!this.props.arena[name]){
				this.props.actions.addPlayer(name);
			}
			this.setState({
				player: name,
				name: ''
			});
		}
		return false;
	}

	removePlayer = () => {
		this.props.actions.removePlayer(this.state.player);
		this.setPlayer(null);
	}

	render(){

		const { arena } = this.props;
		const { player: selectedPlayer, name } = this.state;
		const allPlayers = Object.keys(arena);

		const styles = {
			arena: {
				width: 550,
				height: 550,
				position: 'relative',
				border: '1px solid black'
			},
			player: player => ({
				position: 'absolute',
				width: 50,
				height: 50,
				top: arena[player].y*50,
				left: arena[player].x*50,
				backgroundColor: `hsl(${hueFromString(player)}, 100%, 60%)`,
				opacity: player === selectedPlayer ? 1 : 0.5
			})
		}

		return (
			<div>
				<form onSubmit={this.addPlayer}>
					<input type='text' autoComplete="off" name='name' value={name} onChange={this.handleChange} placeholder='player name'/>
					<input type='submit' value="Add player"/>
				</form>
				Click on a square to select, use arrow keys to control
				<div>
					<span>Selected player: {selectedPlayer}</span>
					{selectedPlayer && <button onClick={this.removePlayer}>Remove player</button>}
				</div>
				<div style={styles.arena}>
					{allPlayers.map((player, index) => (
						<div
						key={index}
						style={styles.player(player)}
						onClick={() => this.setPlayer(player)}>
							{player}
						</div>
					))}
				</div>
			</div>

		);
	}
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(arenaActions, dispatch)
});

const mapStateToProps = state => ({
	arena: state.arena
})

export default connect(mapStateToProps, mapDispatchToProps)(Arena);