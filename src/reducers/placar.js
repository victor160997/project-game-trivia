const INITIAL_STATE = {
  placar: 0,
};
const GET_POINTS = 'GET_POINTS';

function placar(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_POINTS:
    return {
      ...state,
      placar: action.payload,
    };
  default:
    return state;
  }
}

export default placar;
