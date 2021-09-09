const USER_INFO = 'USER_INFO';
const GET_POINTS = 'GET_POINTS';

const userInfo = (payload) => ({
  type: USER_INFO,
  payload,
});

export const getPoints = (payload) => ({
  type: GET_POINTS,
  payload,
});

export default userInfo;
