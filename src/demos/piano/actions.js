export const pressKey = key => ({
	type: 'PRESS_KEY',
	broadcast: true,
	payload: key
});

export const releaseKey = key => ({
	type: 'RELEASE_KEY',
	broadcast: true,
	payload: key
})
