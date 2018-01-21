const defaultState = {
};

export default function arenaReducer(state=defaultState, action) {
  const player = action.payload;
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        [player]: {
          x: 5,
          y: 5
        }
      };
    case 'REMOVE':
      const newState = {...state};
      delete newState[player];
      return newState;
    case 'UP': {
      const position = state[player];
      return {
        ...state,
        [player]: {
          ...position,
          y: Math.max(position.y - 1, 0)
        }
      };
    }
    case 'DOWN': {
      const position = state[player];
      return {
        ...state,
        [player]: {
          ...position,
          y: Math.min(position.y + 1, 10)
        }
      };
    }
    case 'LEFT': {
      const position = state[player];
      return {
        ...state,
        [player]: {
          ...position,
          x: Math.max(position.x - 1, 0)
        }
      };
    }
    case 'RIGHT': {
      const position = state[player];
      return {
        ...state,
        [player]: {
          ...position,
          x: Math.min(position.x + 1, 10)
        }
      };
    }
    default:
      return state;
  }
}
