export const addPlayer = player => ({
	type: 'ADD',
	broadcast: true,
	payload: player
});

export const removePlayer = player => ({
	type: 'REMOVE',
	broadcast: true,
	payload: player
});

export const up = player => ({
	type: 'UP',
	broadcast: true,
	payload: player
});

export const down = player => ({
	type: 'DOWN',
	broadcast: true,
	payload: player
});

export const left = player => ({
	type: 'LEFT',
	broadcast: true,
	payload: player
});

export const right = player => ({
	type: 'RIGHT',
	broadcast: true,
	payload: player
});