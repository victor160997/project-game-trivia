const INITIAL_STATE = {
  placar: 0,
  assertions: 0,
};
const GET_POINTS = 'GET_POINTS';
const GET_ASSERTIONS = 'GET_ASSERTIONS';

function placar(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_POINTS:
    return {
      ...state,
      placar: action.payload,
    };
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: action.assertions,
    };
  default:
    return state;
  }
}

export default placar;
