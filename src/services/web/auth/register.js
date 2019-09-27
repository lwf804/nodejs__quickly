import User from '@models/User';

export const register = async user => {
  const { email, password } = user;
  return User.create({ email, password });
};
