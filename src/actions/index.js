const USER_INFO = 'USER_INFO';
const GET_POINTS = 'GET_POINTS';
const GET_ASSERTIONS = 'GET_ASSERTIONS';

const userInfo = (payload) => ({
  type: USER_INFO,
  payload,
});

export const getPoints = (payload) => ({
  type: GET_POINTS,
  payload,
});

export const getAssertions = (assertions) => ({
  type: GET_ASSERTIONS,
  assertions,
});

export default userInfo;
