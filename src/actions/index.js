const USER_INFO = 'USER_INFO';

const userInfo = (payload) => ({
  type: USER_INFO,
  payload,
});

export default userInfo;
