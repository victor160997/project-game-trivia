const INITIAL_STATE = {
  userInfo: '',
};
const USER_INFO = 'USER_INFO';

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      userInfo: action.payload,
    };
  default:
    return state;
  }
}

export default user;
