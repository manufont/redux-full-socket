const defaultState = {
  food: {
    x: 0,
    y: 0
  },
  positions: {}
};

const up = position => ({
  x: position.x,
  y: Math.max(position.y - 1, 0)
});

const down = position => ({
  x: position.x,
  y: Math.min(position.y + 1, 10)
});

const left = position => ({
  x: Math.max(position.x - 1, 0),
  y: position.y
});

const right = position => ({
  x: Math.min(position.x + 1, 10),
  y: position.y
});


const mod = (number, n) => ((number%n)+n)%n;

const randomIntFromString = str => 
  str.split('').reduce((acc, val) => {
    const hash = val.charCodeAt()*17 + ((acc << 5) - acc)
    return hash & hash;
  }, 0);

const posFromString = str => ({
  x: mod(randomIntFromString(str), 10),
  y: mod(randomIntFromString(str.split('').reverse().join('')), 10)
});
  

const posCmp = (posA, posB) =>
  posA.x === posB.x && posA.y === posB.y;

const collision = (position, positions) =>
  Boolean(Object.keys(positions).find(player => positions[player].find(p => posCmp(p, position))))

const isBlocked = (position, positions) =>
  collision(up(position), positions) &&
  collision(down(position), positions) &&
  collision(left(position), positions) &&
  collision(right(position), positions);
  

const handleMove = (player, position, action, state) => {
  const { food, positions } = state;

  const collide = collision(position, positions);
  const extend = !collide && posCmp(position, food);
  const nextPositions = collide ? positions : {
    ...positions,
    [player]: [position, ...positions[player].slice(0, extend ? undefined : -1)]
  };

  if(isBlocked(position, nextPositions)){
    delete nextPositions[player];
  }

  return {
    ...state,
    ...extend && {
      food: posFromString(action.id)
    },
    positions: nextPositions
  };
}

export default function arenaReducer(state=defaultState, action) {
  const player = action.payload;
  
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        positions: {
          ...state.positions,
          [player]: [{
            x: 5,
            y: 5
          }]
        }
      };
    case 'REMOVE':
      const newPositions = {...state.positions};
      delete newPositions[player];
      return {
        ...state,
        positions: newPositions
      };
    case 'UP': {
      const position = state.positions[player][0];
      return handleMove(player, up(position), action, state);
    }
    case 'DOWN': {
      const position = state.positions[player][0];
      return handleMove(player, down(position), action, state);
    }
    case 'LEFT': {
      const position = state.positions[player][0];
      return handleMove(player, left(position), action, state);
    }
    case 'RIGHT': {
      const position = state.positions[player][0];
      return handleMove(player, right(position), action, state);
    }
    default:
      return state;
  }
}
