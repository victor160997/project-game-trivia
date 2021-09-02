const USER_EMAIL = 'USER_EMAIL';

const userEmail = (payload) => ({
  type: USER_EMAIL,
  payload,
});

export default userEmail;
