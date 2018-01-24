import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as snakeActions from './actions';

const mod = (number, n) => ((number%n)+n)%n;

const hueFromString = str => 
	mod(str.split('').reduce((acc, val) => {
		const hash = val.charCodeAt()*17 + ((acc << 5) - acc)
		return hash & hash;
	}, 0), 360)

class Snake extends Component {

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
			if(!this.props.positions[name]){
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

		const { positions, food } = this.props;
		const { player: selectedPlayer, name } = this.state;
		const allPlayers = Object.keys(positions);

		const styles = {
			arena: {
				width: 550,
				height: 550,
				position: 'relative',
				border: '1px solid black'
			},
			playerPart: (player, position) => ({
				position: 'absolute',
				width: 50,
				height: 50,
				top: position.y*50,
				left: position.x*50,
				backgroundColor: `hsl(${hueFromString(player)}, 100%, 60%)`,
				opacity: player === selectedPlayer ? 1 : 0.5
			}),
			food: {
				position: 'absolute',
				width: 30,
				height: 30,
				top: food.y*50+10,
				left: food.x*50+10,
				backgroundColor: 'black',
				borderRadius: '50%'
			}
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
					{allPlayers.map(player => positions[player].map((position, index) => (
						<div
						key={index}
						style={styles.playerPart(player, position)}
						onClick={() => this.setPlayer(player)}>
							{index === 0 && player}
						</div>
					)))}
					<div style={styles.food} />
				</div>
			</div>

		);
	}
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(snakeActions, dispatch)
});

const mapStateToProps = state => ({
	positions: state.snake.positions,
	food: state.snake.food
})

export default connect(mapStateToProps, mapDispatchToProps)(Snake);