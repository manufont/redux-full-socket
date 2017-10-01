const defaultState = {
  value: 0
};

export default function globalCounter(state=defaultState, action) {
  switch (action.type) {
    case 'INC':
      return {
        ...state,
        value: state.value + 1
      };
    case 'DEC':
      return {
        ...state,
        value: Math.max(state.value - 1, 0)
      };
    default:
      return state;
  }
}
