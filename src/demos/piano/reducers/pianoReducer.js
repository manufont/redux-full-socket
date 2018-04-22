const defaultState = {
};

export default function pianoReducer(state=defaultState, action) {
  switch (action.type) {
    case 'PRESS_KEY':
      return {
        ...state,
        [action.payload]: true
      };
    case 'RELEASE_KEY':
      const { [action.payload]: deletedKey, ...newState } = state;
      return newState;
    default:
      return state;
  }
}
