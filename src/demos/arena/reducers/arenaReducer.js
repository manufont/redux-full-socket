const defaultState = {
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

export default function arenaReducer(state=defaultState, action) {
  const player = action.payload;
  const position = state[player];
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
    case 'UP':
      return {
        ...state,
        [player]: up(position)
      }
    case 'DOWN':
      return {
        ...state,
        [player]: down(position)
      }
    case 'LEFT':
      return {
        ...state,
        [player]: left(position)
      }
    case 'RIGHT':
      return {
        ...state,
        [player]: right(position)
      }
    default:
      return state;
  }
}
